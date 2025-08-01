const db = require('../config/db');

class Order {
    static async create(orderData) {
        const { user_id, total_amount, payment_method, delivery_address } = orderData;
        const [result] = await db.query(
            'INSERT INTO orders (user_id, total_amount, payment_method, delivery_address) VALUES (?, ?, ?, ?)',
            [user_id, total_amount, payment_method, delivery_address]
        );
        return result.insertId;
    }

    static async addOrderItem(order_id, product_id, quantity, price) {
        await db.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
            [order_id, product_id, quantity, price]
        );
    }

    static async findByUser(user_id) {
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
        
        for (let order of orders) {
            const [items] = await db.query(
                `SELECT oi.*, p.name, p.image_url 
                 FROM order_items oi 
                 JOIN products p ON oi.product_id = p.id 
                 WHERE oi.order_id = ?`,
                [order.id]
            );
            order.items = items;
        }
        
        return orders;
    }

    static async updatePaymentStatus(order_id, status) {
        await db.query('UPDATE orders SET payment_status = ? WHERE id = ?', [status, order_id]);
    }
}

module.exports = Order;