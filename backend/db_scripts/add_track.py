import mysql.connector
import config
from google.oauth2 import service_account
from google.cloud import storage

# Verbindung zur MySQL-Datenbank herstellen
db = mysql.connector.connect(
    host=config.MYSQL_HOST,
    user=config.MYSQL_USER,
    password=config.MYSQL_PASSWORD,
    database=config.MYSQL_DATABASE
)
cursor = db.cursor()

# Pfad zur JSON-Servicekonto-Schlüsseldatei
json_keyfile_path = '../bladeify-google-Cloud.json'

# Authentifizierung mit dem Servicekonto
credentials = service_account.Credentials.from_service_account_file(
    json_keyfile_path, scopes=['https://www.googleapis.com/auth/cloud-platform']
)

# Verbindung zum Google Cloud Storage herstellen
storage_client = storage.Client(credentials=credentials)
bucket_name = 'music-bladify'
bucket = storage_client.bucket(bucket_name)

# Liste der Dateien im Bucket abrufen
blobs = bucket.list_blobs()

for blob in blobs:
    # URL zum Herunterladen der Datei erstellen
    song_url = blob.public_url
    # Dateinamen extrahieren
    filename = blob.name

    # SQL-Abfrage zum Einfügen des Songs in die Datenbank erstellen
    insert_query = """
    INSERT INTO tracks (title, file_path)
    VALUES (%s, %s)
    """
    values = (filename, song_url)

    # Song in die Datenbank einfügen
    cursor.execute(insert_query, values)
    db.commit()

# Datenbank-Verbindung schließen
cursor.close()
db.close()
