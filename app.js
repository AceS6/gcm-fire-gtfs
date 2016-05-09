var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var index = require('./lib/routes/index');
var trips  = require('./lib/routes/trips');
var routes  = require('./lib/routes/routes');
var stops  = require('./lib/routes/stops');
var times  = require('./lib/routes/times');

app.use('/', index);
app.use('/trips', trips);
app.use('/routes', routes);
app.use('/stops', stops);
app.use('/times', times);

var server = app.listen(8085, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Mail API listening at http://%s:%s", host, port)

})
