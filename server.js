console.log("Server.js running");

const express = require('express');
const path = require('path');
const app = express();
//const bodyParser = require("body-parser");
//const db = require('./database');

console.log("Boogly boo");

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static("./"));

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000/');
});

