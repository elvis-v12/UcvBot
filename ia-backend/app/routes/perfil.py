from flask import Blueprint, request, jsonify
from mini_db.conexion import conectar_db

perfil_bp = Blueprint('perfil_bp', __name__)

@perfil_bp.route('/perfil', methods=['GET'])
def obtener_perfil():
    user_uid = request.args.get('user_uid')

    try:
        conn = conectar_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT 
                v_userUID AS user_uid,
                v_userName AS nombre,
                v_apellidoPaterno AS apellidoPaterno,
                v_apellidoMaterno AS apellidoMaterno,
                v_email AS correo,
                SUBSTRING_INDEX(v_email, '@', 1) AS usuario,
                v_photoURL AS foto
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

@perfil_bp.route('/perfil', methods=['PUT'])
def actualizar_perfil():
    data = request.get_json()
    user_uid = data.get('user_uid')
    nombre = data.get('nombre')
    apellidoPaterno = data.get('apellidoPaterno')
    apellidoMaterno = data.get('apellidoMaterno')
    correo = data.get('correo')
    foto = data.get('foto')

    try:
        conn = conectar_db()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE student
            SET v_userName = %s,
                v_apellidoPaterno = %s,
                v_apellidoMaterno = %s,
                v_email = %s,
                v_photoURL = %s
            WHERE v_userUID = %s
        """, (nombre, apellidoPaterno, apellidoMaterno, correo, foto, user_uid))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'mensaje': 'Perfil actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
