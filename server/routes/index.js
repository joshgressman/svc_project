var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');


// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/'
    })
);


router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
