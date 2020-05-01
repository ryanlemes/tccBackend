require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const swaggerOptions = require('./Config/SwaggerConfiguration');

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

mongoose.connect(process.env.MONGODBATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 3333);
