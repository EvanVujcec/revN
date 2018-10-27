var express = require('express');
var controller = require('../controllers/event')
var router = express.Router();

/* GET users listing. */

// Get user by ID
router.get('/', function (req, res, next) {
  res.send(`Event ID: ${req.query['id']}`);
});

module.exports = router;