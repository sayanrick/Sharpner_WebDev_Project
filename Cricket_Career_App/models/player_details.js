const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const PlayerDetails = sequelize.define('playerDetails', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoURL: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthplace: {
        type: Sequelize.STRING,
        allowNull: true
    },
    career: {
        type: Sequelize.STRING,
        allowNull: true
    },
    matches: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    fifties: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    centuries: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    wickets: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    average: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
});

module.exports = PlayerDetails;
