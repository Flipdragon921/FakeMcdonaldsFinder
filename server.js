const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the current directory (for index.html, style.css, script.js)
app.use(express.static(__dirname));

// Handle POST requests to /location
app.post('/location', (req, res) => {
  const location = req.body;
  console.log('Received location data:', location);
  // You can process the location data here (e.g., save to a file, database, etc.)
  
  // Send a response back to the client (optional)
  res.status(200).send('Location received');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 