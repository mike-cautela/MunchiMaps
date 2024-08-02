const routes = (fastify, options, done) => {
    const dbFunctions = require("../sqlite");
    
    //route to fetchAllBuildings
    fastify.get("/building", async (request, reply) => {
      try{
        const buildings = await dbFunctions.fetchAllBuildings();
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