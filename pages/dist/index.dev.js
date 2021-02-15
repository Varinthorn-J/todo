"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

var PORT = 8000;
var tasks = [{
  id: 1,
  name: 'Do homework'
}, {
  id: 2,
  name: 'Read book'
}, {
  id: 3,
  name: 'Write a program'
}];
app.use(cors());
app.get('/', function (req, res) {
  res.json(tasks);
});
app.listen(PORT, function () {
  return console.log("listen at ".concat(PORT));
});