from flask import Flask, jsonify, Response
from flask_cors import CORS
from google.cloud import storage
from google.oauth2 import service_account

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
