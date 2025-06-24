from flask import Blueprint, request, jsonify
from mini_db.conexion import conectar_db

perfil_bp = Blueprint('perfil_bp', __name__)

@perfil_bp.route('/perfil', methods=['GET'])
def obtener_perfil():
    user_uid = request.args.get('user_uid')  # Usamos v_userUID

    try:
        conn = conectar_db()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT v_userUID AS user_uid, v_userName AS nombre, v_apellidoPaterno AS apellido, v_email AS correo
            FROM student
            WHERE v_userUID = %s
        """, (user_uid,))
        resultado = cursor.fetchone()
        cursor.close()
        conn.close()

        if resultado:
            return jsonify(resultado)
        else:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
