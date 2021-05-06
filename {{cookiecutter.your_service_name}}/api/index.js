const { Router } = require('express');

const healthcheck = require('./routes/healthcheck.api');
const entity = require('./routes/entity.api');

module.exports = () => {
  const app = Router();
  healthcheck(app);
  entity(app);

  return app;
};
