module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const User = require('../models/User');
  const Friend = require('../models/Friend');

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/', auth, async (req, res) => {
    try {
      const users = await User.find({}).select('-password').sort({
        date: -1,
      });
      // console.log(req.user);
      const usersFilter = users.filter((user) => user._id != req.user.id);
      res.json(usersFilter);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/add-friend/:id', auth, async (req, res) => {
    try {
      const UserA = await User.findById(req.user.id);
      const UserB = await User.findById(req.params.id);
      const docA = await Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 1 } },
        { upsert: true, new: true }
      );
      const docB = await Friend.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 2 } },
        { upsert: true, new: true }
      );
      const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $push: { friends: docA._id } }
      );
      const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $push: { friends: docB._id } }
      );
      res.json(UserA);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  return router;
};
