const router = require('express').Router();
const Schools = require('./schools-model.js');

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

module.exports = router;