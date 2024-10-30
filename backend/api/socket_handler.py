#backend/api/socket_handler.py
from flask_socketio import emit, disconnect
from bson import ObjectId

def message_to_json(message):
    """
    Convert MongoDB ObjectID to string
    """
    return {**message, '_id': str(message['_id'])}

def register_socket_handlers(socketio, messages_collection):
    """Register all Socket.IO event handlers."""

    @socketio.on('connect')
    def handle_connect():
        print('Client connected')
        emit('connected', {'message': 'Connected to the server'})

    @socketio.on('newMessage')
    def handle_new_message(data):
        """Save the new message and broadcast it."""
        sender = data.get('sender')
        text = data.get('text')

        if sender and text:
            # Insert the message into MongoDB and get the inserted document
            result = messages_collection.insert_one(data)
            data['_id'] = result.inserted_id  # Add the MongoDB ID to the data

            # Convert ObjectId to string for broadcasting
            json_data = message_to_json(data)

            emit('newMessage', json_data, broadcast=True)  # Broadcast to all clients

    @socketio.on('typing')
    def handle_typing():
        emit('typing', broadcast=True)

    @socketio.on('stopTyping')
    def handle_stop_typing():
        emit('stopTyping', broadcast=True)

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')
