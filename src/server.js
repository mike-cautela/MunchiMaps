console.log("Server.js running");

const fastify = require("fastify")({
  logger: true
});

const path = require('path');
const dbFunctions = require("../scripts/database.js");
const getData = require("../scripts/processData.js");

const startServer = async () => {
  try {
    
    // Initialize database
    await dbFunctions.initializeDatabase();
    
    // Register static files
    fastify.register(require("@fastify/static"), {
      root: path.join(__dirname, '../Website'),
      prefix: '/',
    });

    // Register routes
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
    fastify.register(require('../scripts/report.js'));

    // Start the server
    const address = await fastify.listen({ port: 5000 });
    console.log(`Server started at ${address}`);

    // Run data processing
    await getData.runDataProcessing();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Start the server and run data processing
startServer();
