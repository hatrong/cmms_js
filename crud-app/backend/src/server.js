const fastify = require('fastify')({ logger: true });
const apiRoutes = require('./routes/api');
const database = require('./config/database');

// Connect to the database
database();

// Register routes
fastify.register(apiRoutes);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();