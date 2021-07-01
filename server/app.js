var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

displayRouter = require('./routes/display');
manageRouter = require('./routes/manage');
authRouter = require('./routes/auth');
tradeRouter = require('./routes/trade');

evaluationController = require('./controllers/evaluationController')
authorization = require('./middleware/authorization');

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
app.use('/auth', authRouter);
app.use('/trade', tradeRouter);

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

var http = require('http')
var port = process.env.PORT || '5000';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log(socket.id + ' connected');
  socket.on('disconnect', () => {
    console.log(socket + ' disconnected');
  }) 
  socket.on('create_comment', post => {
    
  })
})





module.exports = app;
