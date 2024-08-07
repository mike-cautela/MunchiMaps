console.log("Server.js running");

// We are at the mercy of the package.json file. DO NOT anger it.

const express = require('express');
const path = require('path');
const app = express();

const db = require("../scripts/database.js");

console.log("Boogly boo");

// Middelware to serve static files.
app.use(express.static(path.join(__dirname,'../Website')));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

/*
app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile(path.join(__dirname + '/new.html'));
});
*/
db.initializeDatabase();

// app.use(express.static("./"));

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000/');
});
