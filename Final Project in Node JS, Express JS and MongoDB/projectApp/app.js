var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var furnituresRouter = require('./routes/furnitures');
var mattressesRouter = require('./routes/mattresses');
var signInRouter = require('./routes/signIn');
var signUpRouter = require('./routes/signup');
var beddingDeccorRouter = require('./routes/beddingDeccor');
var signOutRouter = require('./routes/signOut');
var cartRouter = require('./routes/cart');
var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'MYSECRET'}));
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/furnitures', furnituresRouter);
app.use('/beddingDeccor', beddingDeccorRouter);
app.use('/mattresses', mattressesRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/signOut', signOutRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
