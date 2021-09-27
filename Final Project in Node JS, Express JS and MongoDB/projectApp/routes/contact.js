var express = require('express'); 
var router = express.Router(); 
var nodemailer = require ('nodemailer'); 
var transporter = nodemailer.createTransport({  
  service: 'gmail',
  auth: {
    user: 'test.johnaliah0529@gmail.com',
    pass: 'AliahKeziah2917'
  }
});

var ssn;

/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session; 

  // Check if the User (session var) if exist
  if(ssn.email) {
    res.render('contact', {fieldInput: ssn.firstName + " " + ssn.lastName});
  }else {
    ssn.err = 'Please Sign-In if your Existing Costumer, otherwise Sign-Up!';
   res.redirect('/signIn');
  }
});
  router.post('/', function(req, res, next) {
    // Take the form data
    ssn.fullName = req.body.fName;
    ssn.email = req.body.em;
    ssn.message = req.body.message;

  var mailOptions = {
    from: 'test.johnaliah0529@gmail.com',
    to: 'johnaliah0529@gmail.com, sairon88_05@yahoo.com',
    subject: 'Message From' + ssn.fullName,
    text: 'Message: ' + ssn.message + '\n From:' + ssn.fullName 
    + '\n User email address: ' + ssn.email
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.render('contact', { errorSignIn: 'There is problem in the email' });
    } else {
      console.log('Email is already sent: ' + info.response);
      res.render('contact', { successSignIn: 'Your message is succesfully send, please check your Email!' });
    }
  });
});
module.exports = router;
