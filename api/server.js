const mysql = require('mysql2');
const express = require('express');
const cors = require('cors'); // 👈 Import CORS
require('dotenv').config();
const moment = require('moment');


const app = express();
const port = process.env.PORT || 80;

// === MIDDLEWARE ===
app.use(cors()); // 👈 Enable CORS (for all origins — good for dev)
app.use(express.json()); // 👈 Parse incoming JSON bodies

// === DB CONNECTION ===
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// === ROUTES ===
app.get('/', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error querying database');
    }
    res.json(results);
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;  // Extract username and password from request body
  console.log('Register received:', { username, password });

  // Ensure that username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Define the SQL query to insert the new user into the 'user' table
  const query = 'INSERT INTO user (username, password) VALUES (?, ?)';

  // Execute the query to insert the data
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error inserting new user:', err);
      return res.status(500).json({ message: 'Error registering user' });
    }

    // If insertion is successful, return a success message
    res.status(200).json({ message: 'Registration successful!' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Login request received:', { username, password });

  // Query the database to find the user by username
  connection.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error querying database' });
    }

    // Check if the user exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare plain text passwords
    if (password === user.password) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


app.post('/report', (req, res) => {
  const {
    Name,
    Type,
    Incident,
    Email,
    latitude,
    longitude,
    LocationDesc,
    Weapon,
    WeaponDesc,
    IncidentDesc,
    PerpDesc,
    Victim,
    VictimDesc,
    Date,
  } = req.body;

  // Ensure required fields are provided
  if (!Name ||  !Email ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Prepare the data for insertion
  const query = `
    INSERT INTO reports (Name, Type, Incident, Email, latitude, longitude, LocationDesc, Weapon, WeaponDesc, IncidentDesc, PerpDesc, Victim, VictimDesc, Date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;



  // Execute the query to insert the data
  connection.query(
    query,
    [
      Name,
      Type,
      Incident,
      Email,
      latitude,
      longitude,
      LocationDesc,
      Weapon,
      WeaponDesc,
      IncidentDesc,
      PerpDesc,
      Victim,
      VictimDesc,
      Date,
    ],
    (err, results) => {
      if (err) {
        console.error('Error inserting new report:', err);
        return res.status(500).json({ message: 'Error submitting report' });
      }

      // If insertion is successful, return a success message
      res.status(200).json({ message: 'Report submitted successfully!' });
    }
  );
});


app.get('/ping', (req, res) => {
  res.json({ message: 'Server is up and running!' });
});


// === START SERVER ===
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
