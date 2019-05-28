const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo') (session);
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const luckyRouter = require('./routes/lucky');
const carsRouter = require('./routes/cars');
const searchRouter = require('./routes/search');
const partsRouter = require('./routes/parts');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');
const ordersRouter = require('./routes/orders');

var app = express();

mongoose.connect('mongodb://localhost/spareparts', {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(
  session({
    store: new MongoStore({mongooseConnection: db}),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'Hdladwfldsfl/dsad/dfhjjlsa//d9%sd1k',
    cookie: {
      // 2 hours
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
    }
  })
);

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lucky', luckyRouter);
app.use('/cars', carsRouter);
app.use('/search', searchRouter);
app.use('/parts', partsRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);
app.use('/orders', ordersRouter);


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
