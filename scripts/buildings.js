const routes = (fastify, options, done) => {
  
  const dbFunctions = require("../sqlite");
  
  //route to fetchAllBuildingNames
  fastify.get("/building/names", async (request, reply) => {
    try{
      const buildings = await dbFunctions.fetchAllBuildingNames();
      reply.send(buildings);
    } catch (err) {
      reply.status(500).send({error: "Failed to fetch buildings"});
    }
  });
  
  //route to fetchSpecificBuildingByName(name)
  fastify.get("/building/name/:name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.fetchSpecififcBuildingByName(name, (err,row) => {
      if(err){
        reply.status(500).send({error: "Failed to fetch building row by name."});
      }
      else{
        reply.send(row);
      }
    })
  });
  
  //route for fetchSpecificBuildingByKey
  fastify.get("/building/id/:id", async (request, reply) => {
    const {id} = request.params;
    dbFunctions.fetchSpecificBuildingByKey(id, (err, row) => {
      if(err){
        reply.status(500).send({error: "Failed to fetch building row by id."});
      }
      else {
        reply.send(row);
      }
    });
  });
  
  //route to get building name by ID
  fastify.get("/building/name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.getBuildingIDByName(name, (err, row) => {
      if(err){
        reply.status(500).send({error: "Failed to fetch building name by id."});
      }
      else {
        reply.send(row);
      }
    });
  });
  
  //route for getting the x_coord
  fastify.get("/building/x_coord/:name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.getX(name, (err, row) => {
      if(err) {
        reply.status(500).send({error: "Failed to get x_coord,"});
      }
      else{
        reply.send(row);
      }
    });
  });
  
  //route for getting the y_coord
  fastify.get("/building/y_coord/:name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.getY(name, (err, rows) => {
      if(err) {
        reply.status(500).send({error: "Failed to get y_coord"});
      }
      else{
        reply.send(rows);
      }
    });
  });
  
  //route for getting number of drink machines
  fastify.get("/building/num_drink_machines/:name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.getNumDrinkMachines(name, (err, rows) => {
      if(err) {
        reply.status(500).send({error: "Failed to get num_drink_machines"});
      }
      else{
        reply.send(rows);
      }
    });
  });
  
  //route for getting number of drink machines
  fastify.get("/building/num_snack_machines/:name", (request, reply) => {
    const {name} = request.params;
    dbFunctions.getNumSnackMachines(name, (err, rows) => {
      if(err) {
        reply.status(500).send({error: "Failed to get num_snack_machines"});
      }
      else{
        reply.send(rows);
      }
    });
  });
  
  //route for inserting a new building in table 
  fastify.post("/building", async (request, reply) => {
    const {name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service} = request.params;
    try{
      await dbFunctions.insertBuilding(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service);
      reply.send({success: true});
    } catch (err){
      reply.status(500).send({error: "Failed to insert new building object."});
    }
  });
  
  
  
  done();
  
};

module.exports = routes;
