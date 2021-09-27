var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://John0588:John@cluster0.efiui.mongodb.net/<dbname>?retryWrites=true&w=majority";

var ssn;

/* GET home page. */
router.get('/', function(req, res, next) {
  ssn = req.session;
  res.render('signIn', {errorSignIn: ssn.err});
});
router.post('/', function(req, res, next) {
  ssn = req.session;
  ssn.email = req.body.em;
  ssn.password = req.body.pass;

  MongoClient.connect(url, function(err,db) {
    if (err) throw err;
      var dbo = db.db("FinalProjectNodeExpress");
      var myQuery = {$and:  [{email: ssn.email, password: ssn.password}]};
      dbo.collection("users").findOne(myQuery, (function(err, result) { 
        if (err) throw err;
        if(result) {
          console.log(result.firstName);
          ssn.firstName = result.fName;
          ssn.lastName = result.lName;
            if (err) throw err;
            if(result) {
            res.redirect('/about');
          }
        }else{
          ssn = req.session.destroy(function(err){
            if (err) throw err;
          });
          res.render('signIn', {errorSignIn: 'The email or password you enter is not valid!'})
        }
    }));     
  });
});
module.exports = router;