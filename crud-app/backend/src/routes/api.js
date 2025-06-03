const ItemController = require('../controllers/controller');

async function routes(fastify, options) {
  // Get all items
  fastify.get('/items', ItemController.getAll);
  
  // Get item by ID
  fastify.get('/items/:id', ItemController.getById);
  
  // Create new item
  fastify.post('/items', ItemController.create);
  
  // Update item
  fastify.put('/items/:id', ItemController.update);
  
  // Delete item
  fastify.delete('/items/:id', ItemController.delete);
}

module.exports = routes;