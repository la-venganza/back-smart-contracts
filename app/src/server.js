const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const db = require("./services/mongodbClient");

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
const start = async () => {
  try {
    db.connectdb();
    await fastify.listen(process.env.PORT, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

module.exports = {
  output: {
      hashFunction: "xxhash64"
  }
};
