console.log("Server.js running");

// We are at the mercy of the package.json file. DO NOT anger it.

const fastify = require("fastify")({
  logger:true
});

const path = require('path');
const dbFunctions = require("../scripts/database.js");
const db = require("../scripts/database.js");

console.log("Boogly boo");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, '../Website'),
  prefix: '/',
});

// Routes
const indexRouter = require('./routes/index');
fastify.register(indexRouter);

fastify.register(require("@fastify/formbody"));

// OnRoute hook to list endpoints
const routes = { endpoints: [] };
fastify.addHook("onRoute", routeOptions => {
  routes.endpoints.push(routeOptions.method + " " + routeOptions.path);
});

// Register route modules
fastify.register(require('../scripts/buildings.js'));
fastify.register(require('../scripts/reviews.js'));

db.initializeDatabase();

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server started at ${address}`);
});
