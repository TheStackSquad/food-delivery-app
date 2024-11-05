const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who have read the message
  });

module.exports = mongoose.model('Message', MessageSchema);