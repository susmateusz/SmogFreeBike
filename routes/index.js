var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET helloworld. */
router.get('/helloworld', function(req, res, next) {
  console.log('Used router!');
  res.render('helloworld', { title: 'Hello, World!' });
});

module.exports = router;
