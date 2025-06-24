# ia-backend/server.py

from flask import Flask, request, jsonify
from flask_cors import CORS

from app.routes.students import studentRoutes
from app.routes.admins import adminRoutes
from app.routes.alternative import alternativeRoutes
from app.routes.chat import chatRoutes
from app.routes.level import levelRoutes
from app.routes.message import messageRoutes

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde Angular

@app.route('/')
def home():
    return "✅ UCV Bot API está activa"

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    pregunta = data.get('pregunta', '')
    
    # Aquí simulas una respuesta, luego puedes reemplazar con tu modelo real
    respuesta = f"Simulación: recibí tu pregunta '{pregunta}' y estoy procesando..."
    
    return jsonify({'respuesta': respuesta})

app.register_blueprint(studentRoutes, url_prefix='/api/students')
app.register_blueprint(messageRoutes, url_prefix='/api/messages')
app.register_blueprint(levelRoutes, url_prefix='/api/level')
app.register_blueprint(adminRoutes, url_prefix='/api/admins')
app.register_blueprint(alternativeRoutes, url_prefix='/api/alternative')
app.register_blueprint(chatRoutes, url_prefix='/api/chats')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
