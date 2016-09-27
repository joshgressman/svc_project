var express = require('express');
var router = express.Router();
var path = require('path');





router.get('/', function(req, res) {
  console.log("request for index");
  res.sendFile(path.join(__dirname, '../public/views/partials/formData/fedData.html'));
});

module.exports = router;
