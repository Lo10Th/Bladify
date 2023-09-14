import mysql.connector
from google.oauth2 import service_account
from google.cloud import storage
from dotenv import load_dotenv
import os

load_dotenv()

db = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)
cursor = db.cursor()

json_keyfile_path = '../bladeify-google-Cloud.json'

credentials = service_account.Credentials.from_service_account_file(
    json_keyfile_path, scopes=['https://www.googleapis.com/auth/cloud-platform']
)

storage_client = storage.Client(credentials=credentials)
bucket_name = 'music-bladify'
bucket = storage_client.bucket(bucket_name)

blobs = bucket.list_blobs()

for blob in blobs:
    song_url = blob.public_url
    filename = blob.name

    insert_query = """
    INSERT INTO tracks (title, file_path)
    VALUES (%s, %s)
    """
    values = (filename, song_url)

    cursor.execute(insert_query, values)
    db.commit()

cursor.close()
db.close()
