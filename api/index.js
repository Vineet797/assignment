const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

async function main() {
  let Low, JSONFile;

  // Conditionally use CommonJS require for testing
  if (process.env.NODE_ENV === 'test') {
    Low = require('lowdb').Low;
    JSONFile = require('lowdb/node').JSONFile;
  } else {
    // Dynamically import lowdb as an ES module for production
    const lowdbModule = await import('lowdb');
    const lowdbNodeModule = await import('lowdb/node');
    Low = lowdbModule.Low;
    JSONFile = lowdbNodeModule.JSONFile;
  }

  // Set up lowdb with JSONFile adapter
  const file = new JSONFile('db.json');
  const db = new Low(file, { requests: [], admins: [{ username: 'admin', password: 'admin123' }] });

  // Read data from db.json file
  await db.read();

  // POST /api/maintenance-requests - Residents submit a maintenance request
  app.post('/api/maintenance-requests', async (req, res) => {
    const { name, email, unitNumber, serviceType, summary, details } = req.body;
    const newRequest = {
      id: uuidv4(),
      name,
      email,
      unitNumber,
      serviceType,
      summary,
      details,
      status: 'open',
    };
    db.data.requests.push(newRequest);
    await db.write();
    res.status(201).json(newRequest);
  });

  // GET /api/maintenance-requests - Admin retrieves all open maintenance requests
  app.get('/api/maintenance-requests', async (req, res) => {
    const openRequests = db.data.requests.filter((request) => request.status === 'open');
    res.json(openRequests);
  });

  // PUT /api/maintenance-requests/:id/close - Admin closes a request
  app.put('/api/maintenance-requests/:id/close', async (req, res) => {
    const { id } = req.params;
    const request = db.data.requests.find((req) => req.id === id);
    if (request) {
      request.status = 'closed';
      await db.write();
      res.json(request);
    } else {
      res.status(404).json({ message: 'Request not found' });
    }
  });

  // Admin login
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const admin = db.data.admins.find((admin) => admin.username === username && admin.password === password);
    if (admin) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  // Start the server
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();

module.exports = app; // Exporting the app for testing 
