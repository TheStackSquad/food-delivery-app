from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from pymongo import MongoClient
from socket_handler import register_socket_handlers
import config

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Connect to MongoDB
client = MongoClient(config.MONGO_URI)
db = client['chat_db']
messages_collection = db['messages']

# Register Socket.IO handlers
register_socket_handlers(socketio, messages_collection)

@app.route('/messages', methods=['GET'])
def get_messages():
    """API to retrieve all chat messages from MongoDB."""
    messages = list(messages_collection.find({}, {"_id": 0}))
    return jsonify(messages), 200

@app.route('/messages', methods=['POST'])
def save_message():
    """API to save a new message to MongoDB."""
    data = request.get_json()
    if not data.get('sender') or not data.get('text'):
        return jsonify({'error': 'Invalid message format'}), 400

    messages_collection.insert_one(data)
    return jsonify({'message': 'Message saved successfully'}), 201

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)