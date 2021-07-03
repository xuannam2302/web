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
var socket_controller = require('./controllers/socketController')
let users = []
io.on('connection', socket => {
    console.log(socket.id + ' connected');
    socket.on('disconnect', () => {
        users = users.filter(user => {user.user_id !== socket.id})
        console.log(socket.id + ' disconnected');
    })
    socket.on('join_room', id => {
        console.log(id)
        if(!id) return;
        const user = {user_id: socket.id, room: id};
        const check = users.every(user => user.user_id !== socket.id)
        if(check) {
            users.push(user);
            socket.join(user.room);
        }
        else {
            users.map(user => {
                if(user.user_id === socket.id) {
                    if(user.room !== id) {
                        socket.leave(user.room);
                        socket.join(id);
                        user.room = id;
                    }
                }
            })
        }
        console.log(users)
        //console.log(socket.adapter.rooms)
    })

    socket.on('create_comment', post => {
        console.log('send_create_post')
        socket_controller.live_post(io, post._id);
    })
})





module.exports = app;
