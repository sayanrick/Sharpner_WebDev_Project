const Sequelize = require('sequelize');

const sequelize = new Sequelize('appointment_booking_app', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
