const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database. This will create the database file if it doesn't exist.//
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');

      //create building table//
      db.run('CREATE TABLE IF NOT EXISTS buildings \
        (id INTEGER PRIMARY KEY AUTOINCREMENT, \
        name TEXT,\
        x_coord DOUBLE, \
        y_coord DOUBLE, \
        time_opens DOUBLE, \
        time_closes DOUBLE, \
        num_snack_machines DOUBLE, \
        num_drink_machines DOUBLE, \
        num_ratings INTEGER, \
        average_ratings DOUBLE, \
        needs_service CHAR \
        )', (err) => {
            if(err) {
                console.error('Error creating the building table',err.message);
            }
            else {
                console.log('The building table was created successfully');
            }
        }
    )};

      //create review table//
      db.run('CREATE TABLE IF NOT EXISTS review ( \
        id INTEGER PRIMARY KEY AUTOINCREMENT, \
        FORIEGN KEY (building_id) REFERENCES building(id), \
        product_rating INTEGER, \
        functionality_rating INTEGER, \
        needs_service CHAR \
      )', (err) => {
        if(err) {
            console.error('Error creating review table.', err.message);
        }
        else {
            console.log('The review table was created successfully');
        }

      }    
    );
});

//INSERTION FUNCTIONS//

//Creating building instance//
function insertBuilding(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO building(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' [name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service], function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve({id: this.lastID, name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service});
            }
        });
    });
}

//Creating review insatnce//
function insertReview(building_id, product_rating, functionality_rating, needs_service) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO reviews (building_id, product_rating, functionality_rating, needs_service) VALUES (?, ?, ?, ?)', [building_id, product_rating, functionality_rating, needs_service], function(err) {
            if(err) {
                reject(err);
            }
            else {
                resolve({id: this.lastID, building_id, product_rating, functionality_rating, needs_service});
            }
        });
    });
}


//Functions to fetch all objects of each table//

//Fetch all buildings//
function fetchBuildings() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM building', [], (err, rows) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}


//Fetch all Reviews//
function fetchReviews() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM review', [], (err, rows) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}

//Defining exports//
module.exports = {
    insertBuilding,
    insertReview,
    fetchBuildings,
    fetchReviews
}



  
