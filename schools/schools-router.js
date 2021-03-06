const router = require('express').Router();
const Schools = require('./schools-model.js');

const restricted = require('../auth/authenticate-middleware.js');

router.route('/')
.get((req, res) => {
  Schools.find()
    .then(schools => {
      res.status(200).json(schools)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

router.route('/:id')
// GET specific school
.get((req,res) => {
  const id = req.params.id;

  Schools.findById(id)
    .then(school => {
      res.status(200).json(school);
    })
    .catch(err => {
      res.status(400).json(err);
    })
})
// DELETE school
.delete(restricted, (req, res) => {
  const id = req.params.id;

  Schools.remove(id)
    .then(data => {
      res.json({ message: `${data} record(s) have been removed.`})
    })
    .catch(err => {
      res.jsonp(400).json(err);
    })
})
// UPDATE school
.put(restricted, validateUpdatedSchool, (req, res) => {
  let id = req.params.id;
  let updatedSchool = req.body;
  Schools.update(updatedSchool, id)
    .then(data => {
      res.status(201).json({
        message: "School updated.",
        name: data.name,
        location: data.location,
        requested_funds: data.requested_funds
      })
    })
    .catch(err => {
      res.status(400).json(err);
    })
})

function validateUpdatedSchool(req, res, next) {
  if (isEmpty(req.body)) {
    res.status(400).json({ message: "No object data." })
  } else {
    next();
  }

  next();
}

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

module.exports = router;