var express = require('express');
var controller = require('../controllers/organization')
var router = express.Router();

/* GET users listing. */

// Get user by ID
router.get('/', function (req, res, next) {
  res.send(`Organization ID: ${req.query['id']}`);
});

module.exports = router;