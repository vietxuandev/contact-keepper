const express = require('express');
const connectDB = require('./config/db');
const cors = require('./middleware/cors');
const app = express();

//connect db

connectDB();

//init middelware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'hello' }));

//Routes
app.use('/api/users', cors, require('./routes/users'));
app.use('/api/auth', cors, require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
