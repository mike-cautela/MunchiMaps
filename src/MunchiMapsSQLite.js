/**
  *  Database management module.
  *
  *
  *
  *
  */

const fs = require("fs");

console.log("Yabada doo!\n");

// Database Initialization.

const dbFile = "./.data/MunchiMaps.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;


dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
})
  .then(async dBase => {
    db = dBase;
  
  
    try {
      
      if(!exists) {
        
        await db.run(
          "CREATE TABLE Machines ( \
            machines_id INTEGER PRIMARY KEY, \
            reviews INTEGER)"
        );
        
        
        
      } else {
        console.log(await db.all("SELECT * from Machines"));
      }
      
    } catch (dbError) {
      console.error(dbError);
    }
});

module.exports = {
  
  getOptions: async() => {
    
    try {
      return await db.all("SELECT * from Machines");
    } catch (dbError) {
      console.error(dbError);
    }
  }
  
};

console.log("SPider");