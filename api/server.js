const express = require('express');
const cors = require('cors');
const server = express();
const secrets = require('../config/secrets.js')

const authRouter = require('../auth/auth-router.js');
const schoolsRouter = require('../schools/schools-router.js');

server.use(cors());
server.use(express.json());

server.use('/api/admin', authRouter);
server.use('/api/schools', schoolsRouter);

// SANITY ENDPOINT
server.get('/api', (req, res) => {
  res.status(200).send({ message: "Good to go." })
})

module.exports = server;