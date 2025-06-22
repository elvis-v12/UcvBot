import mysql.connector
from mysql.connector import Error

try:
    conexion = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',      
        database='ucvbot' 
    )

    if conexion.is_connected():
        print(" Conexión exitosa a la base de datos")

except Error as e:
    print(f" Error al conectar: {e}")

finally:
    if 'conexion' in locals() and conexion.is_connected():
        conexion.close()
        print(" Conexión cerrada")
