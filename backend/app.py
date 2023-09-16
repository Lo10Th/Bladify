from flask import Flask, jsonify, Response
import os
import mysql.connector
from flask_cors import CORS
from dotenv import load_dotenv
from google.cloud import storage
from google.oauth2 import service_account


load_dotenv()
app = Flask(__name__)
CORS(app)
db = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)
cursor = db.cursor()

credentials_path = 'bladeify-google-Cloud.json'
bucket_name = 'music-bladify'

credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = storage.Client(credentials=credentials)

@app.route('/stream/<song_name>', methods=['GET'])
def stream_song(song_name):
    file_name = f'{song_name}.mp3'
    blob = client.bucket(bucket_name).blob(file_name)

    if not blob.exists():
        return jsonify({'error': 'Song not found'}), 404

    def generate():
        with blob.open('rb') as audio_file:
            chunk_size = 1024
            while True:
                chunk = audio_file.read(chunk_size)
                if not chunk:
                    break
                yield chunk

    return Response(generate(), mimetype='audio/mp3')

@app.route('/search/<query>', methods=['GET'])
def search_songs(query):
    search_query = f"%{query}%"
    cursor = db.cursor()
    cursor.execute("SELECT * FROM tracks WHERE title LIKE %s OR artist LIKE %s", (search_query, search_query))
    songs = cursor.fetchall()
    cursor.close()

    result = [{"id": song[0], "title": song[1], "artist": song[2]} for song in songs]
    return jsonify(result)

@app.route('/song/<query>', methods=['GET'])
def get_song(query):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM tracks WHERE id = %s", (query,))
    song = cursor.fetchone()
    cursor.close()

    if not song:
        return jsonify({'error': 'Song not found'}), 404

    result = {"id": song[0], "title": song[1], "artist": song[2]}
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
