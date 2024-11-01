const { loadMessages, saveMessage } = require('../controllers/chatController');

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Emit previous messages
        loadMessages().then(messages => socket.emit('loadMessages', messages));

        // Listen for new messages
        socket.on('newMessage', async (data) => {
            const message = await saveMessage(data);
            if (message) io.emit('newMessage', message); //Broadcast the new message
        });

        // Broadcast typing status
        socket.on('typing', () => socket.broadcast.emit('typing'));
        socket.on('stopTyping', () => socket.broadcast.emit('stopTyping'));

        socket.on('disconnect', () => console.log(`User disconnected: ${socket.id}`));
    });
};

module.exports = socketHandler;