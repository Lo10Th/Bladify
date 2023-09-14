import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

db = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD')
)

cursor = db.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS music_data")

cursor.close()
db.close()
