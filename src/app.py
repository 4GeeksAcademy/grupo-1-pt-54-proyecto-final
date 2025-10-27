"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, decode_token
import urllib.request
import urllib.parse
import json
import os
from flask_mail import Mail, Message
import datetime
from sqlalchemy import select
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
jwt = JWTManager(app)

app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = os.getenv("MAIL_PORT")
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS")
app.config["MAIL_DEFAULT_SENDER"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")

mail = Mail(app)

app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(silent=True)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Faltan credenciales"}), 400

    user = db.session.execute(db.select(User).filter_by(
        email=email)).scalar_one_or_none()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"success": True, "message": "Login exitoso", "access_token": access_token}), 200
    else:
        return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401


@app.route('/api/register', methods=['POST'])
def handle_register():
    data = request.get_json(silent=True)
    email = data.get("email", None)
    password = data.get("password", None)
    is_active = data.get("is_active", True)
    first_name = data.get("first_name", None)
    last_name = data.get("last_name", None)

    if not email or not password or not first_name or not last_name:
        return jsonify({"success": False, "message": "Faltan datos obligatorios"}), 400

    user = db.session.execute(db.select(User).filter_by(
        email=email)).scalar_one_or_none()

    if user:
        return jsonify({"success": False, "message": "El usuario ya existe"}), 400
    else:
        hashed_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
        data['password'] = hashed_password
        data['is_active'] = is_active
        new_user = User.create_user(data)

        expires = datetime.timedelta(hours=12)

        token = create_access_token(identity=email, expires_delta=expires)
        verify_link = f"{os.getenv("VITE_FRONTEND_URL")}verify?token={token}"

        msg = Message("Verificación de cuenta", recipients=[email])
        msg.body = f"Hola {first_name} de parte de Read & Read! \n\nEsperemos que se encuentre bien! Por favor verifica tu cuenta haciendo clic en el siguiente enlace: \n\n {verify_link}"
        mail.send(msg)

        if new_user:
            return jsonify({"success": True, "message": "Usuario creado exitosamente", "user": new_user.serialize()}), 201
        else:
            return jsonify({"success": False, "message": "Error al crear el usuario"}), 500


@app.route('/api/verify/<token>', methods=['GET'])
def verify_token(token):

    try:
        data = decode_token(token)
        user = db.session.execute(db.select(User).filter_by(
            email=data["sub"])).scalar_one_or_none()

        if user:
            user.is_verified = True
            user.is_active = True
            db.session.commit()
            return jsonify({"msg": "Usuario verificado exitosamente"}), 200
        return jsonify({"msg": "Usuario no encontrado"}), 404
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"msg": "Token inválido"}), 400

# forgot_password


@app.route('/api/forgot', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json(silent=True)
        email = data.get("email", None)
        user = db.session.execute(db.select(User).filter_by(
            email=email)).scalar_one_or_none()

        expires = datetime.timedelta(hours=12)
        token = create_access_token(identity=email, expires_delta=expires)
        reset_link = f"{os.getenv('VITE_FRONTEND_URL')}reset?token={token}"

        msg = Message("Recuperar contraseña", recipients=[email])
        msg.body = f"Hola! Para restablecer tu contraseña, haz clic en el siguiente enlace por favor: \n\n {reset_link}"
        mail.send(msg)

        return jsonify({"msg": "Correo de recuperación enviado"}), 200

    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"msg": "Token inválido"}), 400


@app.route('/api/reset-password/<token>', methods=['POST'])
def handle_reset_password(token):

    try:
        decoded_data = decode_token(token)
        data = request.get_json(silent=True)
        email = decoded_data.get("sub")
        user = db.session.execute(
            db.select(User).filter_by(email=email)
        ).scalar_one_or_none()

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        new_password = data.get("password", None)
        password_hash = bcrypt.generate_password_hash(
            new_password).decode('utf-8')
        user.password = password_hash
        db.session.commit()

        return jsonify({"msg": "Contraseña actualizada"}), 200

    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"msg": "Token inválido"}), 400

@app.route('/api/forgot', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json(silent=True)
        email = data.get("email", None)
        user = db.session.execute(db.select(User).filter_by(
            email=email)).scalar_one_or_none()

        token = create_access_token(identifier=email, expires_delta=False)
        reset_link = f"{os.getenv('VITE_FRONTEND_URL')}/reset?token={token}"

        msg = Message("Recuperar contraseña", recipients=[email])
        msg.body = f"Hola, para restablecer tu contraseña, haz clic en el siguiente enlace: {reset_link}"
        mail.send(msg)

        return jsonify({"msg": "Correo de recuperación enviado"}), 200

    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"msg": "Error al enviar el correo"}), 400

BOOKS_FILE = "books.json"


def load_books():
    if not os.path.exists(BOOKS_FILE):
        with open(BOOKS_FILE, "w") as f:
            json.dump([], f)
    with open(BOOKS_FILE, "r") as f:
        return json.load(f)


def save_books(books):
    with open(BOOKS_FILE, "w") as f:
        json.dump(books, f, indent=2)


@app.route("/api/books", methods=["GET"])
def get_books():
    """Return saved books."""
    return jsonify(load_books()), 200


@app.route("/api/books", methods=["POST"])
def add_book():
    """Add a book to local storage."""
    new_book = request.get_json()
    if not new_book or "title" not in new_book:
        return jsonify({"success": False, "message": "Datos inválidos"}), 400
    books = load_books()
 
    if any(b["title"].lower() == new_book["title"].lower() for b in books):
        return jsonify({"success": False, "message": "El libro ya existe"}), 400
    new_book["id"] = new_book.get("id") or str(len(books) + 1)
    books.append(new_book)
    save_books(books)
    return jsonify({"success": True, "message": "Libro agregado", "book": new_book}), 201


@app.route("/api/books/<id>", methods=["GET"])
def get_single_book(id):
    """Return a specific saved book."""
    books = load_books()
    book = next((b for b in books if str(b["id"]) == id), None)
    if not book:
        return jsonify({"success": False, "message": "Libro no encontrado"}), 404
    return jsonify(book), 200 


@app.route('/api/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book_state(book_id):
    user_id = int(get_jwt_identity())
    data = request.get_json(silent=True)
    nuevo_estado = data.get("state")

    estados_validos = ["en_proceso", "en_espera", "finalizado"]

    if nuevo_estado not in estados_validos:
        return jsonify({"success": False, "message": "Estado no válido"}), 400

    from api.models import Book
    book = db.session.execute(db.select(Book).filter_by(
        id=book_id)).scalar_one_or_none()
    if not book:
        return jsonify({"success": False, "message": "Libro no encontrado"}), 404

    if book.user_id != user_id:
        return jsonify({"success": False, "message": "No tienes permiso para modificar este libro"}), 403

    try:
        book.state = nuevo_estado
        db.session.commit()
        return jsonify({
            "success": True,
            "message": "Estado del libro actualizado correctamente",
            "book": {
                "id": book.id,
                "title": book.title,
                "state": book.state
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": "Error al actualizar el estado"}), 500


@app.route('/api/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    user_id = int(get_jwt_identity())

    from api.models import Book
    book = db.session.execute(db.select(Book).filter_by(
        id=book_id)).scalar_one_or_none()
    if not book:
        return jsonify({"success": False, "message": "Libro no encontrado"}), 404

    if book.user_id != user_id:
        return jsonify({"success": False, "message": "No puedes eliminar este libro"}), 403

    try:
        db.session.delete(book)
        db.session.commit()
        return jsonify({
            "success": True,
            "message": f"Libro '{book.title}' eliminado correctamente"
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"success": False, "message": "Error al eliminar el libro"}), 500




# this only runs if ⁠ $ python src/main.py ⁠ is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
