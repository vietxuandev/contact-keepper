const express = require('express');
const connectDB = require('./config/db');
const cors = require('./middleware/cors');
const socketio = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./models/User');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const app = express();

//connect db

connectDB();

//init middelware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'hello' }));

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server);

//Routes
app.use('/api/users', cors, require('./routes/users'));
app.use('/api/auth', cors, require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/people', require('./routes/people')(io));
app.use('/api/chat', require('./routes/chat')(io));

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, config.get('jwtSecret'), function (
      err,
      decoded
    ) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});
io.on('connection', async (socket) => {
  const user = await User.findByIdAndUpdate(
    socket.decoded.user.id,
    { $set: { active: true } },
    { new: true }
  );
  console.log(user.name, 'is online');
  //Siconnect
  socket.on('disconnect', async () => {
    const user = await User.findByIdAndUpdate(
      socket.decoded.user.id,
      { $set: { active: true } },
      { new: true }
    );
    console.log(user.name, 'is online');
  });

  socket.on('join', (id, callback) => {
    socket.join(id);
    callback();
  });

  //Someone is typing
  socket.on('typing', (typing) => {
    socket.broadcast.emit('notifyTyping', {
      typing,
    });
  });
  //when soemone stops typing

  socket.on('sendMessage', async (data, callback) => {
    const { id, content } = data;
    try {
      const sender = await User.findById(socket.decoded.user.id)
        .select('-password')
        .lean();
      const conversation = await Conversation.findById(id).lean();
      const message = await new Message({
        conversation: conversation._id,
        sender: sender._id,
        content,
      }).save();
      io.to(id).emit('message', message);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    callback();
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
