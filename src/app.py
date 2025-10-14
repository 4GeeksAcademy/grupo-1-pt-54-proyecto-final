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
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
jwt = JWTManager(app)
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

    
    user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()

    if user and bcrypt.check_password_hash(user.password, password): 
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"success": True, "message": "Login exitoso","access_token": access_token}), 200
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

    
    user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()

    if user: 
        return jsonify({"success": False, "message": "El usuario ya existe"}), 400
    else:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        data['password'] = hashed_password
        data['is_active'] = is_active
        new_user = User.create_user(data)
        if new_user:
            return jsonify({"success": True, "message": "Usuario creado exitosamente","user":new_user.serialize()}), 201
        else:
            return jsonify({"success": False, "message": "Error al crear el usuario"}), 500
    
@app.route('/api/reset-password', methods=['PUT'])
def reset_password():
    data = request.get_json(silent=True)
    token = data.get("token")
    nueva_password = data.get("nueva_password")

    if not token or not nueva_password:
        return jsonify({"success": False, "message": "Faltan datos"}), 400

    user = db.session.execute(db.select(User).filter_by(reset_code=token)).scalar_one_or_none()

    if not user:
        return jsonify({"success": False, "message": "Token inválido o expirado"}), 400

    hashed_password = bcrypt.generate_password_hash(nueva_password).decode('utf-8')
    user.password = hashed_password

    user.reset_code = None
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Contraseña actualizada correctamente"
    }), 200
    
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
    book = db.session.execute(db.select(Book).filter_by(id=book_id)).scalar_one_or_none()
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
    book = db.session.execute(db.select(Book).filter_by(id=book_id)).scalar_one_or_none()
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
if __name__ == '_main_':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)