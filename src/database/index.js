const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Device = require('../models/Device')

const connection = new Sequelize(dbConfig);

Device.init(connection);

module.exports = connection