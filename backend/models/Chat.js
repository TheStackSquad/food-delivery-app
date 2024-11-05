const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of User IDs
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' }, // Last message in the chat
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
