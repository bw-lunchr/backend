const express = require('express');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());

// SANITY ENDPOINT
server.get('/', (req, res) => {
  res.status(200).send({ message: "Good to go." })
})

module.exports = server;