console.log("database.js --- ");

const fs = require("fs");

const dbFile = "/.src/container.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const dbWrapper = require("sqlite");
let db;


dbWrapper.open({
  filename: dbFile,
  driver: sqlite3.Database
  
}).then(async dBase => {
  db = dBase;
  
  try{
    if(!exists) {
      await db.run (
        'CREATE TABLE IF NOT EXISTS building \
            (id INTEGER PRIMARY KEY AUTOINCREMENT, \
            name TEXT, \
            x_coord DOUBLE, \
            y_coord DOUBLE, \
            time_opens DOUBLE, \
            time_closes DOUBLE, \
            num_snack_machines DOUBLE, \
            num_drink_machines DOUBLE, \
            num_ratings INTEGER, \
            average_ratings DOUBLE, \
            needs_service CHAR \
        )'
      )
      await db.run (
        'CREATE TABLE IF NOT EXISTS review ( \
            id INTEGER PRIMARY KEY AUTOINCREMENT, \
            building_id INTEGER, \
            product_rating INTEGER, \
            functionality_rating INTEGER, \
            needs_service CHAR, \
            FOREIGN KEY (building_id) REFERENCES buildings(id) \
        )'
      )
    }
    else {
      console.log(await db.all('SELECT * from building'))
    }
  }
  catch (dbError){
      console.catch(dbError);
    }
});

module.exports = {
  insertBuilding: async (name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) => {
    try{
      await db.run('INSERT INTO building (name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service]); 
    }
    catch(dbError) {
      console.catch(dbError);
    }
  },
  
  insertReview: async (building_id, product_rating, functionality_rating, needs_service) => {
    try {
      await db.run('INSERT INTO review (building_id, product_rating, functionality_rating, needs_service) VALUES (?, ?, ?, ?)', 
        [building_id, product_rating, functionality_rating, needs_service]);
    }
    catch (dbError) {
      console.catch(dbError);
    }
  },

  fetchAllBuildings: async() => {
    try{
      return await db.all('SELECT * FROM building');
    }
    catch(dbError){
      console.log(dbError);
    }
  },
  
  fetchAllReviews: async() => {
    try{
      return await db.all('SELECT * FROM review');
    }
    catch(dbError){
      console.log(dbError);
    }
  },

};
