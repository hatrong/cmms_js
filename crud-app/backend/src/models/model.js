class CrudModel {
    constructor(db) {
        this.db = db;
    }

    async create(data) {
        const query = 'INSERT INTO items(name, description) VALUES($1, $2) RETURNING *';
        const values = [data.name, data.description];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async read(id) {
        const query = 'SELECT * FROM items WHERE id = $1';
        const values = [id];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async update(id, data) {
        const query = 'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *';
        const values = [data.name, data.description, id];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
        const values = [id];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async getAll() {
        const query = 'SELECT * FROM items';
        const res = await this.db.query(query);
        return res.rows;
    }
}

module.exports = CrudModel;