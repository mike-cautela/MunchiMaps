console.log("Server.js running");

// We are at the mercy of the package.json file. DO NOT anger it.

const express = require('express');
const path = require('path');
const app = express();

const db = require("../scripts/database.js");

console.log("Boogly boo");

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../Website/new.html'));
});

db.initializeDatabase();

app.use(express.static("./"));

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000/');
});
