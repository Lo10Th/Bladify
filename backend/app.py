from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def hello():
    return jsonify({'message': 'Hi Mom!'})

if __name__ == '__main__':
    app.run(debug=True)