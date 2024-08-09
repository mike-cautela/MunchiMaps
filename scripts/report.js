const routes = (fastify, options, done) => {

    const dbFunctions = require("./database.js");

    //route for inserting a report object//
    fastify.post("/report", async (request, reply) => {
        const {building_id, title, description} = request.params;
        try{
            await dbFunctions.addReport(building_id, title, description);
            reply.sind({success: true});
        }
        catch (err) {
            reply.status(500).send({error: "Failed to insert new report objects"});
        }
    });

    done();
}

module.exports = routes;
