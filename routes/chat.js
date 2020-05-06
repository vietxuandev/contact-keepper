module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const User = require('../models/User');
  const Message = require('../models/Message');
  const Conversation = require('../models/Conversation');
  const mongoose = require('mongoose');

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.post('/message/:id', auth, async (req, res) => {
    try {
      const { content } = req.body;
      const message = await new Message({
        conversation: mongoose.Types.ObjectId(req.params.id),
        sender: mongoose.Types.ObjectId(req.user.id),
        content,
      }).save();
      res.json(message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.get('/message/:id', auth, async (req, res) => {
    try {
      const messages = await Message.find({
        conversation: mongoose.Types.ObjectId(req.params.id),
      })
        .sort({
          createdAt: -1,
        })
        .limit(50)
        .lean();
      messages.sort((a, b) => a.createdAt - b.createdAt);
      res.json(messages);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.post('/conversation', auth, async (req, res) => {
    try {
      const { participants = [] } = req.body;
      const conversation = await new Conversation({ participants }).save();
      res.json(conversation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/conversation', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const conversation = await Conversation.aggregate([
        { $match: { participants: { $all: [user._id] } } },
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'participants',
            as: 'participants',
          },
        },
        {
          $project: {
            'participants.password': 0,
            'participants.friends': 0,
          },
        },
      ]);
      res.json(conversation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/conversation/:id', auth, async (req, res) => {
    try {
      const conversation = await Conversation.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'participants',
            as: 'participants',
          },
        },
        {
          $project: {
            'participants.password': 0,
            'participants.friends': 0,
          },
        },
      ]);
      res.json(conversation[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  return router;
};
