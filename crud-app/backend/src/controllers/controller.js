const pool = require('../config/database');

class ItemController {
    static async getAll(request, reply) {
        try {
            const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
            reply.send({ success: true, data: result.rows });
        } catch (error) {
            reply.status(500).send({ success: false, error: error.message });
        }
    }

    static async getById(request, reply) {
        try {
            const { id } = request.params;
            const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
            
            if (result.rows.length === 0) {
                return reply.status(404).send({ success: false, error: 'Item not found' });
            }
            
            reply.send({ success: true, data: result.rows[0] });
        } catch (error) {
            reply.status(500).send({ success: false, error: error.message });
        }
    }

    static async create(request, reply) {
        try {
            const { name, description } = request.body;
            const result = await pool.query(
                'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
                [name, description]
            );
            reply.status(201).send({ success: true, data: result.rows[0] });
        } catch (error) {
            reply.status(500).send({ success: false, error: error.message });
        }
    }

    static async update(request, reply) {
        try {
            const { id } = request.params;
            const { name, description } = request.body;
            const result = await pool.query(
                'UPDATE items SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [name, description, id]
            );
            
            if (result.rows.length === 0) {
                return reply.status(404).send({ success: false, error: 'Item not found' });
            }
            
            reply.send({ success: true, data: result.rows[0] });
        } catch (error) {
            reply.status(500).send({ success: false, error: error.message });
        }
    }

    static async delete(request, reply) {
        try {
            const { id } = request.params;
            const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
            
            if (result.rows.length === 0) {
                return reply.status(404).send({ success: false, error: 'Item not found' });
            }
            
            reply.send({ success: true, data: result.rows[0] });
        } catch (error) {
            reply.status(500).send({ success: false, error: error.message });
        }
    }
}

module.exports = ItemController;