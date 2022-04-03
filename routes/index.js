var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(process.env.APP_NAME);
});

router.get('/tes', function(req, res, next) {
  res.send(process.env.APP_NAME);
});

module.exports = router;
