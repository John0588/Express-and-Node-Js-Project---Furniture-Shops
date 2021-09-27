var express = require('express');
var router = express.Router();

var ssn;
/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session.destroy(function(err){ // this part is destroying the sesson in profile if the user is already existing
    if (err) throw err;
  });
  res.redirect('/');
});

module.exports = router;