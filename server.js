const express = require('express');
const connectDB = require('./config/db');
const cors = require('./middleware/cors');
const socketio = require('socket.io');
const http = require('http');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./models/User');
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
io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('join', async ({ room }, callback) => {
    let user = await User.findById(socket.decoded.user.id);
    socket.join(room);
    // Gửi cho tất cả client
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    // Gửi cho tất cả client trong room ngoại trừ người gửi
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });
    // Gửi tin nhắn riêng cho socket đó qua socketId
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
