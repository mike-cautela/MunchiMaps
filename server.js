const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

//parse JSON bodies
app.use(bodyParser.json());

//serve static files from the public directory 
app.use(express.static('public'));

//To create new building instance//
app.post('/building', async (req, res) => {
    const {name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service} = req.body;
try {
    const newBuilding = await db.insertBuilding(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service);
    res.status(201).json(newBuilding);
}
catch (err) {
    res.status(500).send(err.message);
}
});

//Insert new review instance//
app.post('/building/:id/review', async (req, res) => {
    const {id} = req.params;
    const{product_rating, functionality_rating, needs_service} = req.body;
    try {
        const newReview = await db.insertReview(id, product_rating, functionality_rating, needs_service);
        res.status(201).json(newReview);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

//Getting buildings//
app.get('/building', async (req, res) => {
    try {
        const buildings = await db.fetchBuildings();
        res.json(buildings);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

//Getting reviews//
app.get('/review', async (req, res) => {
    try {
        const reviews = await db.fetchReviews();
        res.json(reviews);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });