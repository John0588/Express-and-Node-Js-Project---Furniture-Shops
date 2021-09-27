var express = require('express'); 
var router = express.Router(); 

var ssn; 

/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session; 

  // Check if the User (session var) if exist
  if(ssn.email) {
    res.render('product', {fieldInput: ssn.firstName + " " + ssn.lastName});
  }else {
    ssn.err = 'Please Sign-In if your Existing Costumer, otherwise Sign-Up!';
   res.redirect('/signIn');
  }
});

module.exports = router;