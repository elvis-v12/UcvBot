# ia-backend/server.py

from flask import Flask, request, jsonify
from flask_cors import CORS

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
