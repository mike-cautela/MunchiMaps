const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

const vendingData = JSON.parse(fs.readFileSync('nodes.json', 'utf8'));
const vendingMachines = vendingData.machines;

app.get('/', (req, res) => {
    res.json(vendingMachines);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
