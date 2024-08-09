// src/routes/index.js
module.exports = async function (fastify, option) {
  
  fastify.get('/', async (request, reply) => {
    return reply.sendFile('new.html');
  });
  
  fastify.setNotFoundHandler((request, reply) => {
    reply.send(404).send("Not Found");
  });
};

