const mongoose = require('mongoose');

const FriendsSchema = mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    status: {
      type: Number,
      enums: [
        0, //'add friend',
        1, //'requested',
        2, //'pending',
        3, //'friends'
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('friends', FriendsSchema);
