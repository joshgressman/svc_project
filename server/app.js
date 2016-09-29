var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//define routes here;
var reportRoute = require('./routes/reportRoute');
var dataRoute = require('./routes/dataRoute');
var federalRoute = require('./routes/federalRoute');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

//set app.use for route here;
app.use('/reportRoute', reportRoute);
app.use('/dataRoute', dataRoute);
app.use('/federalRoute', federalRoute);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

//****************************START SERVER ************************//
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("Listening on port", app.get('port'));
});
