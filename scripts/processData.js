///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                                                                                                    //////
/////   This file will use axios to make HTTP requests and put coord data into a CSV file and type data into a JSON file   //////
/////                                                                                                                    //////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const axios = require('axios');
const fs = require('fs');
const path = require('path');

let buildingNames = [];
let coordsMap = new Map();
let typeMap = new Map();

const fetchAllBuildingNames = async () => {
  try {
    // Make a GET request to the Fastify route to fetch all building names
    const response = await axios.get('http://localhost:5000/building/names');
    const buildings = response.data;

    // Log the response data to check its structure
    console.log('Response Data:', buildings);

    // Extract building names and store them in the global variable
    if (Array.isArray(buildings)) {
      buildingNames = buildings.map(building => building.name);
      console.log('Building Names:', buildingNames);
    } else {
      console.error('Expected an array but received:', typeof buildings);
      buildingNames = [];
    }
  } catch (error) {
    console.error('Error fetching building names:', error);
    buildingNames = [];
  }
};

// Function for fetching x_coord given name
const fetchX = async (name) => {
  try {
    const response = await axios.get(`http://localhost:5000/building/x_coord/${name}`);
    const x_coord = response.data.x_coord;
    
    console.log(`X-Coord for ${name}:`, x_coord);
    return x_coord;
  } catch (error) {
    console.error(`Error fetching X-Coord for ${name}:`, error);
    return null;
  }
};

// Function for fetching y_coord given name
const fetchY = async (name) => {
  try {
    const response = await axios.get(`http://localhost:5000/building/y_coord/${name}`);
    const y_coord = response.data.y_coord;
    
    console.log(`Y-Coord for ${name}:`, y_coord);
    return y_coord;
  } catch (error) {
    console.error(`Error fetching Y-Coord for ${name}:`, error);
    return null;
  }
};

// Function that returns T/F if a building has drink machines
const hasDrinkMachines = async (name) => {
  try {
    const response = await axios.get(`http://localhost:5000/building/num_drink_machines/${name}`);
    const num_drink_machines = response.data.num_drink_machines;
    
    return num_drink_machines > 0;
  } catch (error) {
    console.error(`Error fetching if ${name} has drink machines:`, error);
    return null;
  }
}

// Function that returns T/F if a building has snack machines
const hasSnackMachines = async (name) => {
  try {
    const response = await axios.get(`http://localhost:5000/building/num_snack_machines/${name}`);
    const num_snack_machines = response.data.num_snack_machines;
    
    return num_snack_machines > 0;
  } catch (error) {
    console.error(`Error fetching if ${name} has snack machines:`, error);
    return null;
  }
}

// Function to build a map with key building name and values x and y coords
const buildCoordMap = async () => {
  if (buildingNames.length > 0) {
    for (const name of buildingNames) {
      console.log("Current Building:", name);
      
      const x_coord = await fetchX(name);
      const y_coord = await fetchY(name);
      
      if (x_coord !== null && y_coord !== null) {
        coordsMap.set(name, [x_coord, y_coord]);
      }
    }
    console.log("Coords map:", coordsMap);
  } else {
    console.log("Building names list is empty.");
  }
};

// Function to build a map with key building name and values T/F for drink and snack machines
const buildTypeMap = async () => {
  if (buildingNames.length > 0) {
    for (const name of buildingNames) {
      console.log("Current Building:", name);
      
      const has_drink_machine = await hasDrinkMachines(name);
      const has_snack_machine = await hasSnackMachines(name);
      
      if (has_drink_machine !== null && has_snack_machine !== null) {
        typeMap.set(name, [has_drink_machine, has_snack_machine]);
      }
    }
    console.log("Type Map:", typeMap);
  } else {
    console.log("Building names list is empty.");
  }
}

// Exports names and coordinates to a CSV file for testPlot to read from
const exportCoordData = (filePath) => {
  const header = "Name, x_coord, y_coord\n";
  const rows = Array.from(coordsMap.entries()).map(([name, [x, y]]) => `"${name}","${x}","${y}"`).join('\n');
  const content = header + rows;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("CSV file created at", filePath);
};

// Function to create a JSON file for typeMap data
const exportTypeData = (filename) => {
  const jsonData = Array.from(typeMap.entries()).reduce((acc, [name, [has_drinks, has_snacks]]) => {
    acc.push({ name, drink: has_drinks, food: has_snacks });
    return acc;
  }, []);
  
  fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log("JSON file created at", filename);
};

// Main function to execute all commands required
const runDataProcessing = async () => {
  console.log("Running function runDataProcessing :P");
  const coordFile = path.join(__dirname, '../database/building_coords.csv');
  const typeFile = path.join(__dirname, '../database/type_data.JSON');
  
  const fileExists = (file) => fs.existsSync(file);
  
  if(!fileExists(coordFile) || !fileExists(typeFile)){
    try {
      await fetchAllBuildingNames();
      await buildCoordMap();
      await buildTypeMap();    
    }
    catch (err) {
      console.error("Error reading in data.");
    }
  }
  if(!fileExists(coordFile)){
    try {
      exportCoordData(coordFile);
    }
    catch (err) {
      console.error("Error exporting coordinate data.");
    }
  }
  else {
    console.log("Coords File already exists.");
  }

  if(!fileExists(typeFile)){
    try {
      exportTypeData(typeFile);
    }
    catch (err) {
      console.error("Error exporting type data.");
    }
  }
  else{
    console.log("Type file already exists.");
  }
}

module.exports = { runDataProcessing };
