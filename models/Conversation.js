const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('conversations', ConversationSchema);
