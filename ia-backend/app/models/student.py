from app.database import conectar

def getAll():
    conexion = conectar()
    if not conexion:
        return None
    try:
        cursor = conexion.cursor(dictionary=True)
        cursor.execute("SELECT * FROM student")
        return cursor.fetchall()
    finally:
        conexion.close()
