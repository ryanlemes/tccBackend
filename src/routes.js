const express = require('express');
require('express-group-routes');

const userController = require('./Controllers/UserController');
const historyController = require('./Controllers/HistoryController');
const statisticController = require('./Controllers/StatisticController');
const authController = require('./Controllers/AuthController');
const equipmentController = require('./Controllers/EquipmentController');

const routes = express.Router();

routes.group('/api/v1', (router) => {
  router.get('/', (req, res) => res.json('TCC backend API'));

  router.post('/login', authController.login);

  router.group('/user', (groupRoute) => {
    groupRoute.get('/:id', userController.show);
    groupRoute.post('/', userController.store);
    groupRoute.put('/:id', userController.update);
    groupRoute.delete('/:id', userController.remove);

    groupRoute.get('/:id/calibration', historyController.lastUserCalibration);
  });

  router.group('/calibration', (groupRoute) => {
    groupRoute.post('/', historyController.store);
    groupRoute.get('/equipment/:id', historyController.equipmentCalibration);
  });

  router.group('/equipment', (groupRoute) => {
    groupRoute.post('/', equipmentController.store);
  });

  router.group('/statistic', (groupRoute) => {
    groupRoute.get('/dailycalibration/:id', statisticController.dailyCalibration);
  });
});

module.exports = routes;
