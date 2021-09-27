var express = require('express'); 
var router = express.Router(); 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://John0588:John@cluster0.efiui.mongodb.net/<dbname>?retryWrites=true&w=majority";

var ssn;

/* GET home page. */
router.get('/', function(req, res, next) { 
  ssn = req.session;
  res.render('signUp', { errorMessage: ssn.err }); 
});
router.post('/', function(req, res, next) {
  ssn = req.session;
  // Take the form data
  ssn.firstName = req.body.fName;
  ssn.lastName = req.body.lName;
  ssn.email = req.body.em;
  ssn.password = req.body.pass;
 
  // Insert the new document
  MongoClient.connect(url, function(err,db) {
  if (err) throw err;
    var dbo = db.db("FinalProjectNodeExpress");
    var user = {firstName: ssn.firstName, lastName: ssn.lastName, email: ssn.email, password: ssn.password};
    var myQuery = { email: ssn.email};

    dbo.collection("users").findOne(myQuery, (function(err, result) { 
      if (err) throw err;
      if(result) {
        ssn = req.session.destroy(function(err){ 
          if (err) throw err;
        });
        res.render('signUp', {errorSignUp: "User is already exist, please Sign-In!"});
      }else {
        dbo.collection("users").insertOne(user, function (err, res) {
          if (err) throw err; 
        });
      res.redirect('/signIn');
      }

      db.close(); 
    })); 
  }); 
}); 

module.exports = router;