const fastify = require('fastify')({ logger: true });
require('dotenv').config();

// Register CORS
fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:5173', 'http://localhost:3000']
});

// Register routes
fastify.register(require('./routes/api'), { prefix: '/api' });

// Root route
fastify.get('/', async (request, reply) => {
  return { message: 'CRUD API is running!' };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();