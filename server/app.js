var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const Trenitalia = require("api-trenitalia");
const moment = require('moment');
(async () => {
    const t = new Trenitalia();
    const stations_from = await t.autocomplete("milano");
    const station_from = stations_from[0].name;
    const stations_to = await t.autocomplete("bari");
    const station_to = stations_to[0].name;

    const date = moment().add(3, 'months').format("DD/MM/YYYY");
    const solutions = await t.getOneWaySolutions(station_from, station_to, date, "13", 2, 0);
    console.log(solutions);
})();

module.exports = app;
