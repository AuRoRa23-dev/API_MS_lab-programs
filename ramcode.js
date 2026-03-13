const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

const SECRET_KEY = "mysecretkey";

app.use(cors());
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];


// Unprotected route
app.get('/', (req, res) => {
  res.send('API is working!');
});


// Route to generate JWT token
app.get('/token', (req, res) => {

  const token = jwt.sign(
    { user: "demoUser" },   // payload
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({
    message: "Token generated successfully",
    token: token   // showing generated token
  });

});


// JWT Authentication Middleware
function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send("Token required");

  jwt.verify(token, SECRET_KEY, (err, user) => {

    if (err) return res.status(403).send("Invalid token");

    req.user = user;
    next();

  });
}


// Protected route
app.get('/users', authenticateToken, (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});