var createError = require('http-errors');
var express = require('express');  //----
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



//var indexRouter = require('./routes/index');

const router = require('./routes/route');  //-----------//
const usersRouter = require('./routes/users');
const customerRouter = require('./routes/customerRoute');
const productRouter = require('./routes/productRoute');
const customerManyToMany = require ('./routes/customerRouter(many-to-many)');
const productManyToMany = require('./routes/productRouter(many-to-many)');
const customerProductManyToMany = require ('./routes/customerProduct(many-to-many)');
//const productInfo = require('./Models/productInfo');
// const customerInfo = require('./Models/customerInfo');
 
const sequelize = require('./Models/sequelizeConnection');

var app = express();    //-------------//
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






sequelize.sync();
app.use('/', router);
app.use('/users', usersRouter);
app.use('/' , customerRouter);
app.use('/', productRouter);
app.use('/' , customerManyToMany);
app.use('/' , productManyToMany);
app.use('/' , customerProductManyToMany);






// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

