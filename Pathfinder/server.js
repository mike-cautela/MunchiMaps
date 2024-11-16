const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

const vendingData = JSON.parse(fs.readFileSync('nodes.json', 'utf8'));
const vendingMachines = vendingData.machines;

const GOOGLE_MAPS_API_KEY = 'API KEY';
//IDK how to actually get the API yet

app.get('/route-to-vending-machine', async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).send('Latitude and longitude are required.');
    }

    // Convert query params to numbers
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Find the nearest vending machine
    const nearest = vendingMachines.reduce((prev, current) => {
        const [prevLat, prevLng] = prev.location.map(Number);
        const [currLat, currLng] = current.location.map(Number);

        const prevDistance = Math.hypot(userLat - prevLat, userLng - prevLng);
        const currDistance = Math.hypot(userLat - currLat, userLng - currLng);

        return currDistance < prevDistance ? current : prev;
    });

    const [destLat, destLng] = nearest.location;

    // Request directions from Google Maps API
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
            params: {
                origin: `${userLat},${userLng}`,
                destination: `${destLat},${destLng}`,
                mode: 'walking',
                key: GOOGLE_MAPS_API_KEY
            }
        });

        const directions = response.data;

        // Send back the directions and nearest vending machine details
        res.json({
            vendingMachine: nearest,
            directions: directions.routes[0]
        });
    } catch (error) {
        res.status(500).send('Error fetching directions from Google Maps API');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
