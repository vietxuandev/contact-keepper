module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const auth = require('../middleware/auth');

  const User = require('../models/User');

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
  router.post('/', auth, async (req, res) => {
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

  return router;
};
