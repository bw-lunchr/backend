const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admins = require('../admins/admins-model.js');
const Schools = require('../schools/schools-model.js')
const secrets = require('../config/secrets.js');

const restricted = require('./authenticate-middleware.js')

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
          message: 'Logged in!',
          fullName: admin.fullName,
          email: admin.email,
          token: token
        });
      } else if (admin.password == password && admin.email == email) {
        const token = generateToken(admin)
        res.status(200).json({
          message: 'Logged in!',
          fullName: admin.fullName,
          email: admin.email,
          token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.route('/:id')
.get(restricted, (req, res) => {
  let id = req.params.id;
  Admins.findById(id)
    .then(admin => {
      res.status(200).json(admin)
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong." })
    })
})
.put(restricted, (req, res) => {
  let updatedAdmin = req.body;
  let id = req.params.id;
  Admins.update(updatedAdmin, id)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong." })
    })
})

router.route('/:id/schools')
.get(restricted, (req, res) => {
  const id = req.params.id;

  Admins.getSchoolsById(id)
    .then(schools => {
      res.status(200).json(schools)
    })
    .catch(err => {
      res.status(400).json(err);
    })
})
.post(restricted, (req, res) => {
  const { id } = req.params;
  const newSchool = req.body;
  newSchool.admin_id = id;
  Schools.addSchool(newSchool)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong." })
    })
})

// GET ALL ADMINS
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

