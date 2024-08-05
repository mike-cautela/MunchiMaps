const fs = require("fs").promises;

const dbFile = "./munchiData.db";
const sqlite3 = require('sqlite3').verbose();
const dbWrapper = require("sqlite");
const path = require('path');
const dbPath = path.join(__dirname, 'munchiData.db');
let db;

function buildBuildingTable() {
    db.run(`CREATE TABLE IF NOT EXISTS building (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    x_coord REAL NOT NULL,
    y_coord REAL NOT NULL,
    time_opens TEXT NOT NULL,
    time_closes TEXT NOT NULL,
    num_snack_machines INTEGER,
    num_drink_machines INTEGER,
    num_ratings INTEGER,
    average_ratings REAL,
    needs_service BOOLEAN
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err.message);
    }
    else{
      console.log("Building table created successfully.");
    }
  });
}

function buildReviewTable(){
  db.run(
    'CREATE TABLE IF NOT EXISTS review ( \
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        building_id INTEGER, \
        product_rating INTEGER, \
        functionality_rating INTEGER, \
        needs_service CHAR, \
        FOREIGN KEY (building_id) REFERENCES building(id) \
    )', (err) => {
    if(err){
      console.error('Error creating review table', err.message);
    }
    else{
      console.log("Review table created successfully.");
    }
  });
}

function initializeDatabase() {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
      
      //check if building table has been created before creating and initializing
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=?",['building'], (err,row) => {
        if(err){
          console.error('Error checking for the building table');
        }
        if(!row){
          console.log("Building does not yet exist-- creating now.");
          buildBuildingTable();
          populateWithStarterData();
        }
        else{
          console.log("Building table already exists.");
        }
      });
      
      //checking if review table exists yet
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name=?", ['review'], (err, row) => {
        if(err){
          console.error("Error checking for review table.");
        }
        if(!row){
          console.log("Review table does not yet exist-- creating now.");
          buildReviewTable();
        }
        else{
          console.log("Review table already exists.");
        }
      });     
    }
  });
}

const populateWithStarterData = async () => {
  try {
    // Read JSON file
    const data = await fs.readFile(path.join(__dirname, 'originalBuildings.JSON'), "utf8");
    const jsonData = JSON.parse(data);

    // Prepare SQL statement
    const stmt = db.prepare(
      "INSERT INTO building (name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      function (err) {
        if (err) {
          console.error("Error preparing statement", err.message);
          return;
        }

        // Execute SQL statement for each item in JSON data
        jsonData.forEach((item) => {
          stmt.run(
            item.name,
            item.x_coord,
            item.y_coord,
            item.time_opens,
            item.time_closes,
            item.num_snack_machines,
            item.num_drink_machines,
            item.num_ratings,
            item.average_ratings,
            item.needs_service,
            function (err) {
              if (err) {
                console.error("Error inserting data", err.message);
              }
            }
          );
        });

        // Finalize the statement
        stmt.finalize(function (err) {
          if (err) {
            console.error("Error finalizing statement", err.message);
          }
        });
      }
    );
  } catch (err) {
    console.error("Error in populateWithStarterData", err.message);
  }
};

//function to return entire row given building name
function fetchSpecificBuildingByName(name, callback) {
  db.get("SELECT * FROM building WHERE name = ?", [name], (err, row) => {
    if(err){
      console.error(err.message);
    }
    else{
      callback(null, row);
    }
  });
};

//function to get building id by its name
function fetchSpecificBuildingByKey(key, callback) {
  db.get("SELECT * FROM building WHERE id = ?", [key], (err, row) => {
    if(err){
      console.error(err.message);
    }
    else{
      callback(null, row);
    }
  });
};

//function to get a building ID given its name
function  getBuildingIDByName(name, callback){
  const stmt = "SELECT id FROM building WHERE name = ?;";
  db.get(stmt, [name], (err, row) => {
    if(err){
      console.error(err.message);
    }
    else {
      callback(null, row);
    }
  });
};

//function that gets the x-coord given building name
function getX(name, callback){
  const stmt = "SELECT x_coord FROM building WHERE name = ?;";
  db.get(stmt, [name], (err, row) => {
    if(err){
      console.err(err.message);
    }
    else{
      callback(null, row);
    }
  });
};

//function that gets the y-coord given building name
function getY(name, callback){
  const stmt = "SELECT y_coord FROM building WHERE name = ?;";
  db.get(stmt, [name], (err, row) => {
    if(err){
      console.err(err.message);
    }
    else{
      callback(null, row);
    }
  });
};

  
const fetchAllBuildingNames = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT name FROM building;";
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function getNumSnackMachines(name, callback){
  const stmt = "SELECT num_snack_machines FROM building WHERE name = ?;";
  db.get(stmt, [name], (err,row) => {
    if(err) {
      console.err(err.message);
    }
    else {
      callback(null, row);
    }
  });
};

function getNumDrinkMachines(name, callback){
  const stmt = "SELECT num_drink_machines FROM building WHERE name = ?;";
  db.get(stmt, [name], (err,row) => {
    if(err) {
      console.err(err.message);
    }
    else {
      callback(null, row);
    }
  });
};


module.exports = {
  initializeDatabase,
  populateWithStarterData,
  fetchSpecificBuildingByName,
  fetchSpecificBuildingByKey,
  getBuildingIDByName,
  fetchAllBuildingNames,
  getX,
  getY,
  getNumSnackMachines,
  getNumDrinkMachines,
  
  insertBuilding: async (name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) => {
    try{
      await db.run('INSERT INTO building (name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, sum_ratings, average_ratings, needs_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
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
      
      const stmt = "UPDATE building \
                    SET sum_ratings = sum_ratings + ( \
                        SELECT product_rating + functionality_rating \
                        FROM review \
                        WHERE review.building_id = building_id \
                        ORDER by review.id DESC \
                        LIMIT 1 \
                    )\
                    WHERE id = ?;";
    await db.run(stmt, [building_id]);
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