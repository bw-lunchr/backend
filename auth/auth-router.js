const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admins = require('../admins/admins-model.js');
const secrets = require('../config/secrets.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let admin = req.body;
  const hash = bcrypt.hashSync(admin.password, 10); // 2 ^ n
  admin.password = hash;

  Admins.add(admin)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  Admins.findBy({ email })
    .first()
    .then(admin => {
      
      // check password is correct
      if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = generateToken(admin)
        res.status(200).json({
          message: `${admin.email} added as an admin!, have a token...`,
          token, // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/', (req, res) => {
  Admins.find()
    .then(admins => {
      res.status(200).json(admins)
    })
})

function generateToken(admin) {
  const payload = {
    email: admin.email
  }

  const options = {
    expiresIn: '2d'
  }
  // bring in the secret from the secrets file
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;

