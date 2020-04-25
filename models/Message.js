const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversations',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('messages', MessageSchema);
