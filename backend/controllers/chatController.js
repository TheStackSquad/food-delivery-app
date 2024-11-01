const Message = require('../models/Message');

const loadMessages = async () => {
  try {
    const messages = await Message.find().lean();
    return messages.map(message => ({ ...message, _id: message._id.toString() }));
  } catch (err) {
    console.error("Failed to load messages:", err);
    return [];
  }
};

const saveMessage = async (data) => {
  try {
    const message = new Message(data);
    await message.save();
    return { ...message.toObject(), _id: message._id.toString() };
  } catch (err) {
    console.error("Error saving message:", err);
    return null;
  }
};

module.exports = { loadMessages, saveMessage };