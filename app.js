var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload=require('express-fileupload')
var hbs=require('express-handlebars')
const session=require('express-session')
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var db=require('./mongo-connection/dbconnection');
const { handlebars } = require('hbs');
const hnadle=require('./helper/handlebar-helper')

var app = express();
console.log("app start");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"key",name:'session1',cookie:{maxAge:604800000}}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/', usersRouter);
app.use('/admin', adminRouter);
app. engine( 'hbs', hbs( { extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/' } ) );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

db.connect((err)=>{
  if(err){
    console.log('Database not connected'+err);
  } 
  else{
    console.log('Database connected');
  } 
}).then(() => {
  app.listen(process.env.PORT, () => {
      console.log("listening for requests");
  })
})

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
