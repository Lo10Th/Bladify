import mysql.connector
import config

# Verbindung zur MySQL-Datenbank herstellen (verwende deine eigenen Verbindungsinformationen)
db = mysql.connector.connect(
    host=config.MYSQL_HOST,
    user=config.MYSQL_USER,
    password=config.MYSQL_PASSWORD,
    database=config.MYSQL_DATABASE
)

# MySQL-Cursor erstellen
cursor = db.cursor()

# SQL-Abfrage zum Einfügen eines neuen Musiktitels
insert_query = """
INSERT INTO tracks (title, artist, album, genre, file_path, duration, release_date)
VALUES (%s, %s, %s, %s, %s, %s, %s)
"""

# Daten für den neuen Titel
new_track_data = ('Song Title', 'Artist Name', 'Album Name', 'Genre', '/path/to/file.mp3', 240, '2023-09-12')

# Einfügen des neuen Titels
cursor.execute(insert_query, new_track_data)

# Transaktion bestätigen und Verbindung schließen
db.commit()
cursor.close()
db.close()
