"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
import urllib.request
import urllib.parse
import json
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/books/search', methods=['GET'])
def search_books():
    title = request.args.get('title', '').strip()

    if len(title) < 2:
        return jsonify({"success": False, "message": "El titulo debe tener al menos 2 caracteres"}), 400

    try:
        query = urllib.parse.quote(title)
        url = f"https://openlibrary.org/search.json?q={query}&limit=12"

        with urllib.request.urlopen(url) as response:
            raw_data = response.read()
            data = json.loads(raw_data)

        books = []
        for idx, item in enumerate(data.get("docs", [])):
            books.append({
                "id": item.get("key") or f"{item.get('title', 'unknown')}-{idx}",
                "title": item.get("title", "Sin titulo"),
                "authors": ", ".join(item.get("author_name", ["Autor desconocido"])),
                "cover_i": item.get("cover_i"),
                "cover_url": f"https://covers.openlibrary.org/b/id/{item['cover_i']}-L.jpg" if item.get("cover_i") else None
            })

        return jsonify({"success": True, "results": books}), 200

    except Exception as e:
        print("Error al buscar libros:", str(e))
        return jsonify({"success": False, "message": "Error interno al buscar libros"}), 500
