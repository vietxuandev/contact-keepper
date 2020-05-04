module.exports = function (io) {
  const mongoose = require('mongoose');
  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const User = require('../models/User');
  const Friend = require('../models/Friend');
  const Conversation = require('../models/Conversation');

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/', auth, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id).select('-password');
      const users = await User.find()
        .select('-password')
        .sort({
          date: -1,
        })
        .lean();
      const friends = await Friend.find({ requester: currentUser._id })
        .lean()
        .where('_id')
        .in(currentUser.friends)
        .select('recipient status')
        .exec();

      users.forEach((user) => {
        const result = friends.find((friend) => {
          return String(friend.recipient) === String(user._id);
        });
        user.status = result ? result.status : 0;
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
      const UserA = await User.findById(req.user.id).select('-password').lean();
      const UserB = await User.findById(req.params.id)
        .select('-password')
        .lean();
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
        { _id: UserA, friends: { $ne: docA._id } },
        { $push: { friends: docA._id } }
      );
      const updateUserB = await User.findOneAndUpdate(
        { _id: UserB, friends: { $ne: docB._id } },
        { $push: { friends: docB._id } }
      );
      UserB.status = 1;
      res.json(UserB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/accept-friend/:id', auth, async (req, res) => {
    try {
      const UserA = await User.findById(req.user.id).select('-password').lean();
      const UserB = await User.findById(req.params.id)
        .select('-password')
        .lean();
      await Friend.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 } }
      );
      await Friend.findOneAndUpdate(
        { recipient: UserA, requester: UserB },
        { $set: { status: 3 } }
      );
      UserB.status = 3;
      const conversation = await Conversation.find({ participants: { $all: [req.user.id, req.params.id] } });
      if (conversation.length === 0) {
        await new Conversation({ participants: [req.params.id, req.user.id] }).save();
      }
      res.json(UserB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/reject-friend/:id', auth, async (req, res) => {
    try {
      const UserA = await User.findById(req.user.id).select('-password').lean();
      const UserB = await User.findById(req.params.id)
        .select('-password')
        .lean();
      const docA = await Friend.findOneAndRemove({
        requester: UserA,
        recipient: UserB,
      });
      const docB = await Friend.findOneAndRemove({
        recipient: UserA,
        requester: UserB,
      });
      const updateUserA = await User.findOneAndUpdate(
        { _id: UserA },
        { $pull: { friends: docA._id } }
      );
      const updateUserB = await User.findOneAndUpdate(
        { _id: UserB },
        { $pull: { friends: docB._id } }
      );
      UserB.status = 0;
      res.json(UserB);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/people
  // @desc     Get all friend
  // @access   Private
  router.get('/all-friend/', auth, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user.id).select('-password');
      const users = await User.find()
        .select('-password')
        .sort({
          date: -1,
        })
        .lean();
      const friends = await Friend.find({ requester: currentUser._id })
        .lean()
        .where('_id')
        .in(currentUser.friends)
        .select('recipient status')
        .exec();

      users.forEach((user) => {
        const result = friends.find((friend) => {
          return String(friend.recipient) === String(user._id);
        });
        user.status = result ? result.status : 0;
      });

      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  return router;
};
