
console.log("SERVER.JS IS STARTING...");
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// 1. Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Allow reading JSON data

// 2. Import Routes
const docRoutes = require('./routes/docRoutes');

// 3. Use Routes
app.use('/api/docs', docRoutes);

// 4. Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});