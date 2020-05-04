// https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Calibration backend',
      description: 'Backend api for Calibrator application for PUC tcc',
      contact: {
        name: 'Lidiane Cássia & Ryan Lemes',
        email: 'ryan.bezerra@sga.pucminas.br',
      },
      servers: ['http://localhost:3333'],
      version: '1.0.0',
    },
  },
  apis: ['./src/Controllers/*.js', './src/Models/*.js'],
};


module.exports = swaggerOptions;
