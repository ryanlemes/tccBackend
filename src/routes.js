const express = require('express');
require('express-group-routes');

const userController = require('./Controllers/UserController');
const calibrationController = require('./Controllers/CalibrationController');
const statisticController = require('./Controllers/StatisticController');
const authController = require('./Controllers/AuthController');
const equipmentController = require('./Controllers/EquipmentController');
const authMiddleware = require('./Middlewares/auth');

const routes = express.Router();

routes.group('/api/v1', (router) => {
  router.get('/', (req, res) => res.json('TCC backend API'));

  router.post('/login', authController.login);

  router.group('/user', (groupRoute) => {
    groupRoute.get('/', authMiddleware, userController.show);
    groupRoute.post('/', userController.store);
    groupRoute.put('/', authMiddleware, userController.update);
    groupRoute.delete('/', authMiddleware, userController.remove);
  });

  router.group('/calibration', (groupRoute) => {
    groupRoute.post('/', calibrationController.store);
    groupRoute.get('/user/equipment/:id', authMiddleware, calibrationController.lastUserCalibration);
    groupRoute.get('/equipment/:id', authMiddleware, calibrationController.equipmentCalibration);
  });

  router.group('/equipment', (groupRoute) => {
    groupRoute.post('/', equipmentController.store);
  });

  router.group('/statistic', (groupRoute) => {
    groupRoute.get('/dailycalibration/:id', authMiddleware, statisticController.dailyCalibration);
  });
});

module.exports = routes;
