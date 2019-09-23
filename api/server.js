const express = require('express');
const cors = require('cors');
const server = express();

const authRouter = require('../auth/auth-router.js');

server.use(cors());
server.use(express.json());

server.use('/api/admin', authRouter);

// SANITY ENDPOINT
server.get('/', (req, res) => {
  res.status(200).send({ message: "Good to go." })
})

module.exports = server;