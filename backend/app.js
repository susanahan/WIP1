var config        = require('./config'),
express       = require('express'),
users        = require('./routes/users.js'),
path          = require('path'),
passport      = require('passport'),
session       = require('express-session'),
cookieParser  = require('cookie-parser')
bodyParser    = require('body-parser'),
app           = express(),
logger        = require('morgan'),
PORT          = process.env.PORT || config.port;

// require('./auth/passport.js')(passport);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use(morgan('tiny'));


app.use(session({ 
resave: true,
saveUninitialized: true,
secret: 'hamster kitten fight' 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', '');

// app.use('/', router);
app.use("/users", users);

app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});


// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.json(err);
});

app.listen(PORT);


module.exports = app;