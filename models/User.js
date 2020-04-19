const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
