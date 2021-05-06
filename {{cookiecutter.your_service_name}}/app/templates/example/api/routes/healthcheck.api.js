const status = require('http-status');

module.exports = (app) => {
  // This endpoint should be modified to check db (or other dependencies) connectivity
  app.get('/healthcheck', (req, res) => res.status(status.OK).send('OK'));

  // To be used to ensure service is running
  app.get('/ping', (req, res) => res.status(status.OK).send('PONG'));
};
