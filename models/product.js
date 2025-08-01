const db = require('../config/db');

class Product {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(productData) {
        const { name, description, category, price, old_price, image_url, stock_quantity } = productData;
        const [result] = await db.query(
            'INSERT INTO products (name, description, category, price, old_price, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, category, price, old_price || null, image_url, stock_quantity]
        );
        return result.insertId;
    }

    static async update(id, productData) {
        const { name, description, category, price, old_price, image_url, stock_quantity } = productData;
        await db.query(
            'UPDATE products SET name = ?, description = ?, category = ?, price = ?, old_price = ?, image_url = ?, stock_quantity = ? WHERE id = ?',
            [name, description, category, price, old_price || null, image_url, stock_quantity, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;