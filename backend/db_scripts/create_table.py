import mysql.connector
import config

db = mysql.connector.connect(
    host=config.MYSQL_HOST,
    user=config.MYSQL_USER,
    password=config.MYSQL_PASSWORD,
    database=config.MYSQL_DATABASE
)
cursor = db.cursor()

create_table_query = """
CREATE TABLE IF NOT EXISTS tracks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    album VARCHAR(255),
    genre VARCHAR(255),
    file_path VARCHAR(255) NOT NULL,
    duration INT,
    release_date DATE
)
"""

cursor.execute(create_table_query)

cursor.close()
db.close()