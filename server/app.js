var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require ('path');

var index = require('./routes/index');

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);


//****************************START SERVER ************************//
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("Listening on port", app.get('port'));
});
