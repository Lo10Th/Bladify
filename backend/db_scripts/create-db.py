import mysql.connector
import config

db = mysql.connector.connect(
    host=config.MYSQL_HOST,
    user=config.MYSQL_USER,
    password=config.MYSQL_PASSWORD,
)

cursor = db.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS music_data")

cursor.close()
db.close()
