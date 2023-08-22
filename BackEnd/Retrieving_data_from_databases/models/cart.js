const db = require('../util/database');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    return db.execute(
      'INSERT INTO cart (productId, quantity, totalPrice) VALUES (?, 1, ?) ' +
      'ON DUPLICATE KEY UPDATE quantity = quantity + 1, totalPrice = totalPrice + ?',
      [id, productPrice, productPrice]
    );
  }

  static deleteProduct(id, productPrice) {
    return db.execute(
      'DELETE FROM cart WHERE productId = ?',
      [id]
    );
  }

  static getCart() {
    return db.execute('SELECT products.*, cart.quantity FROM products ' +
                     'JOIN cart ON products.id = cart.productId');
  }
};
