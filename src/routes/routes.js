const express = require('express');
const DeviceController = require('../controllers/deviceController');

const routes = express.Router();

routes.post('/device', DeviceController.createDevice);
routes.get('/device', DeviceController.getAllDevice);
routes.get('/device/buscar?', DeviceController.getBySearchTerm);
routes.get('/device/:id', DeviceController.getByIdDevice);
routes.put('/device/:id', DeviceController.updateDevice);
routes.delete('/device/:id', DeviceController.deleteDevice);

module.exports = routes;