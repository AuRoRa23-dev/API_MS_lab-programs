require('dotenv').config({ path: './config/.env' });

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); //v2

const app = express();

app.use(cors());

app.use(express.json());

/* ========================
   VERIFY TOKEN FUNCTION V2
======================== */
function verifyToken(req, res, next) {

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

/* ========================
   LOGIN ROUTE V2
======================== */
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {

    const token = jwt.sign(
      { username: username },
      process.env.JWT_SECRET
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

/* ========================
   PROTECT STUDENT ROUTES V2
======================== */
app.use('/api/students', verifyToken, require('./modules/student/routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
