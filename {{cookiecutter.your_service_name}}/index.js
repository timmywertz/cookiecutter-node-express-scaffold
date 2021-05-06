const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const routes = require('./api');

const { serverSettings } = require('./config/config');
const logger = require('./lib/logger');

const logErrors = require('./utils/logError');
const handleErrors = require('./utils/handleError');

const app = express();

// remove x-powered-by response header
app.disable('x-powered-by');

app.use(morgan('combined', { stream: logger.stream }));

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes());
app.use('/api', routes());
app.use(logErrors);
app.use(handleErrors);

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

function startServer() {
  app.listen(serverSettings.port, (err) => {
    if (err) {
      logger.error('Error starting service', err);
      return;
    }
    logger.info(`Service running on ${serverSettings.port}`);
  });
}

startServer();

// export app for testing
module.exports = app;
