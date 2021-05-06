const status = require('http-status');

const Entity = require('../../models/entity');

// TODO use DI to grab service
const EntityService = require('../../services/entity.service');

const entityServiceInstance = new EntityService(new Entity());

const validator = require('../../utils/validators/entityValidator');

module.exports = (app) => {
  app.get('/entities', async (req, res, next) => {
    try {
      const entities = await entityServiceInstance.getAll();
      return res.status(status.OK).json({ data: entities });
    } catch (err) {
      return next(err);
    }
  });

  app.get('/entities/:id', async (req, res, next) => {
    try {
      const entity = await entityServiceInstance.getEntity({ id: req.params.id });
      return res.status(status.OK).json({ data: entity });
    } catch (err) {
      return next(err);
    }
  });

  app.post('/entities', validator.createEntity, validator.validate, async (req, res, next) => {
    try {
      const entity = await entityServiceInstance.createEntity(req.body);
      return res.status(status.CREATED).json({ data: entity });
    } catch (err) {
      return next(err);
    }
  });

  app.put('/entities/:id', validator.updateEntity, validator.validate, async (req, res, next) => {
    try {
      const entity = await entityServiceInstance.updateEntity({ ...req.body, id: req.params.id });
      return res.status(status.OK).json({ data: entity });
    } catch (err) {
      return next(err);
    }
  });

  app.delete('/entities/:id', async (req, res, next) => {
    try {
      await entityServiceInstance.deleteEntity({ id: req.params.id });
      return res.status(status.NO_CONTENT).send();
    } catch (err) {
      return next(err);
    }
  });
};
