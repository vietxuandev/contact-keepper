module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');
  const User = require('../models/User');
  const Message = require('../models/Message');
  const Conversation = require('../models/Conversation');

  // @route    GET api/people
  // @desc     Get all users
  // @access   Private
  router.post('/message/:id', auth, async (req, res) => {
    try {
      const sender = await User.findById(req.user.id)
        .select('-password')
        .lean();
      const conversation = await Conversation.findById(req.params.id).lean();
      const { content } = req.body;
      const message = await new Message({
        conversation: conversation._id,
        sender: sender._id,
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
      const conversation = await Conversation.findById(req.params.id).lean();
      const messages = await Message.find({
        conversation: conversation._id,
      });
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

  return router;
};
