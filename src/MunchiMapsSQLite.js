/**
  *  Database management module.
  *
  *
  *
  *
  */

const fs = require("fs");

// Database Initialization.

const dbFile = "./.data/MunchiMaps.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

