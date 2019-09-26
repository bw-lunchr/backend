const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admins = require('../admins/admins-model.js');
const Schools = require('../schools/schools-model.js')
const secrets = require('../config/secrets.js');

const restricted = require('./authenticate-middleware.js')

// for endpoints beginning with /api/auth
// REGISTER ENDPOINT
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

// LOGIN ENDPOINT
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

// ENDPOINT SPECIFIC TO ADMIN'S ID
router.route('/:id')
.get(restricted, validateAdminId, (req, res) => {
  let id = req.params.id;
  Admins.findById(id)
    .then(admin => {
      res.status(200).json(admin)
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong." })
    })
})
.put(restricted, validateAdminId, (req, res) => {
  let updatedAdmin = req.body;
  let id = req.params.id;
  Admins.update(updatedAdmin, id)
    .then(data => {
      res.status(201).json({
        message: `Updated ${data.fullName}'s record.`,
        email: data.email,
        fullName: data.fullName,
        password: data.password
      })
    })
    .catch(err => {
      res.status(400).json({ message: "Something went wrong." })
    })
})

// ENDPOINT FOR SCHOOLS SPECIFIC TO ADMIN ID
router.route('/:id/schools')
.get(restricted, validateAdminId, (req, res) => {
  const id = req.params.id;

  Admins.getSchoolsById(id)
    .then(schools => {
      res.status(200).json(schools)
    })
    .catch(err => {
      res.status(400).json(err);
    })
})
.post(restricted, validateAdminId, validateSchool, (req, res) => {
  const { id } = req.params;
  const newSchool = req.body;
  newSchool.admin_id = id;
  console.log(id, newSchool, id)
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

function validateAdminId(req, res, next) {
  const id = req.params.id;
  Admins.findById(id)  
    .then(user => {
      req.user = user;
    })
    .catch(err => {
      res.status(400).send("Invalid Admin Id")
    })
    next();
};

function validateSchool(req, res, next) {
  const { name, location, requested_funds } = req.body

  if (isEmpty(req.body)) {
    res.status(400).send({ 
      message: "Missing school data." 
    })

  } else if (req.body && !name) {
    res.status(400).send({
      message: "Missing required name field." 
    })

  } else if (req.body && !location) {
    res.status(400).send({
      message: "Missing required location field." 
    })

  } else if (req.body && !requested_funds) {
    res.status(400).send({ 
      message: "Missing required requested funds data." 
    })

  } else if (req.body && !name && !location) {
    res.status(400).send({ 
      message: "Missing required name and location data." 
  })

  } else if (req.body && !location && !requested_funds) {
    res.status(400).send({ 
      message: "Missing required locatio nand requested funds data." 
    })

  } else if (req.body && !name && !location) {
    res.status(400).send({ 
      message: "Missing required name and location data." 
    })
  } else {
    next();
  }
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

module.exports = router;

