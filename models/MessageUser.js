const mongoose = require('mongoose');

const MessageUserSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messages',
  },
});

module.exports = mongoose.model('messageUser', MessageUserSchema);
