var createError = require('http-errors');
var express = require('express');  //----
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


 
//var indexRouter = require('./routes/index');

const router = require('./routes/route');  //-----------//
const usersRouter = require('./routes/users');
const bookRouter = require('./routes/bookRoute');
const authorRouter = require('./routes/authorRoute');
const customerManyToMany = require ('./routes/customerRouter');
const productManyToMany = require('./routes/productRouter');
//const customerProductManyToMany = require ('./routes/customerProduct');
const fileUploaderRouter = require('./routes/fileUploaderRoute')
const authRouter = require ('./routes/authenticationRoute');
const excelRouter = require ('./routes/excelRoute');
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






sequelize.sync({alter:true});
app.use('/', router);
app.use('/users', usersRouter);
app.use('/' , bookRouter);
app.use('/', authorRouter);
app.use('/' , customerManyToMany);
app.use('/' , productManyToMany);
//app.use('/' , customerProductManyToMany);
app.use('/' , fileUploaderRouter);
app.use('/' , authRouter);
app.use('/' , excelRouter);






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

