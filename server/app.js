var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var cors = require('cors');


displayRouter = require('./routes/display');
manageRouter = require('./routes/manage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/', displayRouter);
app.use('/manage', manageRouter);

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
  res.status(err.status || 5000);
  res.render('error');
});

const db = require('./models');
const Role = db.role;
const uri = "mongodb://localhost:27017/web";
const mongoose = require('mongoose');
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if(!err && count == 0) {
      new Role({
        name: "user"
      }).save(err => {
        if(err)
          console.log("error", err);
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  })
}

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Successfully connect to MongoDB");
    initial();
  })
  .catch(err => {
    console.error("Connect error", err);
    process.exit();
  });



module.exports = app;
