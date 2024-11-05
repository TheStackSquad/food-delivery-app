const mongoose = require('mongoose');
const Message = require('../models/Message');

// Function to load all messages
const loadMessages = async () => {
  try {
    const messages = await Message.find().lean();
    return messages.map(message => ({ ...message, _id: message._id.toString() }));
  } catch (err) {
    console.error("Failed to load messages:", err);
    return [];
  }
};

// Function to save a new message
const saveMessage = async (data) => {
  try {
    const { sender, content, chatId } = data;

    // Validate sender, content, and chatId fields
    if (!mongoose.Types.ObjectId.isValid(sender)) {
      throw new Error("Invalid sender ID.");
    }

    if (!content || typeof content !== 'string') {
      throw new Error("Content is required and must be a non-empty string.");
    }

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      throw new Error("Invalid chat ID.");
    }

    // Create and save the message
    const message = new Message({ sender, content, chatId });
    await message.save();
    return { ...message.toObject(), _id: message._id.toString() };
  } catch (err) {
    console.error("Error saving message:", err.message);
    return null;
  }
};

module.exports = { loadMessages, saveMessage };
