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
    status: {
      type: Number,
      default: 0,
      enums: [
        0, //'Sent',
        1, //'Seen',
        2, //'Revoke',
        3, //'Remove'
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('messages', MessageSchema);
