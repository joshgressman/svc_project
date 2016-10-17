var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/user.js');
var session = require('express-session');

//define routes here;
var index = require('./routes/index');
var reportRoute = require('./routes/reportRoute');
var dataRoute = require('./routes/dataRoute');
var userRoute = require('./routes/userRoute');
var register = require('./routes/register');
var user = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// app.use(function(req, res, next) {
//   console.log("REQ: ", req.url);
//   if(req.url == '/favicon.ico'){
//     return;
//   }
// });

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


//set app.use for route here;
app.use('/reportRoute', reportRoute);
app.use('/dataRoute', dataRoute);
app.use('/userRoute', userRoute);
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/views/index.html'));
// });

//****************************START SERVER ************************//
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("Listening on port", app.get('port'));
});
