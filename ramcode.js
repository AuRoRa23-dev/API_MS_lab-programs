const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

/* =========================
   User Schema & Model
========================= */

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

/* =========================
   Routes
========================= */

app.get('/', (req, res) => {
  res.send('API is working!');
});

// GET all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// POST new user
app.post('/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// PUT update user
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send('User not found');

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send('User not found');

    res.status(204).send();
  } catch (err) {
    res.status(400).send('Invalid ID');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});