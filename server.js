""
const fs = require("fs");
const path = require("path");

const fastify = require("fastify")({
  logger:false,
})

fastify.register(require("@fastify/static")), {
  root: path.join(__dirname, "public"),
  prefix: "/",
}

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// We use a module for handling database operations in /src
const data = require("./src/data.json");
const db = require("./src/" + data.database);

/* I'm just yapping ngl. */
console.log("Yaponomics");