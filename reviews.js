const routes = (fastify, options, done) => {
    const dbFunctions = require("../sqlite");
    
    //route to fetchAllReviews
    fastify.get("/review", async (request, reply) => {
      try{
        const reviews = await dbFunctions.fetchAllReviews();
        reply.send(reviews);
      }
      catch (err) {
        reply.status(500).send({error: "Failed to fetch all reviews"});
      }
    });
    
    fastify.post("/review", async (request, reply) => {
      const {building_id, product_rating, functionality_rating, needs_service} = request.params;
      try {
        await dbFunctions.insertReview(building_id, product_rating, functionality_rating, needs_service);
        reply.send({success: true});
      }
      catch (err) {
        reply.status(500).send({error: "Failed to insert new review object."});
      }
    })
    
    done();
  };
  
  module.exports = routes;