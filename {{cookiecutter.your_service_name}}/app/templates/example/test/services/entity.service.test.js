/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const EntityService = require('../../services/entity.service');

const entityModel = {
  getEntities: () => [],

  getEntity: (id) => ({
    id,
    name: 'mock',
    color: 'blue',
    createdOn: 1234567890,
    updatedOn: null,
  }),

  create: (entity) => ({
    ...entity,
    id: 'mock-id',
    createdOn: 1234567890,
    updatedOn: null,
  }),

  update: (entity) => ({
    ...entity,
    updatedOn: 1234567890,
  }),

  delete: () => undefined,
};

const userInput = {
  name: 'mock',
  color: 'blue',
};

describe('Entity Service', () => {
  let entityService;
  beforeEach(() => {
    entityService = new EntityService(entityModel);
  });
  describe('getAll function', () => {
    it('should return an array', (done) => {
      entityService.getAll().then((result) => {
        expect(result).to.exist;
        expect(result).to.be.an('array');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('getEntity function', () => {
    it('should return an Entity record', (done) => {
      entityService.getEntity({ ...userInput, id: '123' }).then((result) => {
        expect(result).to.exist;
        expect(result.id).to.exist;
        expect(result.name).to.exist;
        expect(result.color).to.exist;
        expect(result.createdOn).to.exist;
        expect(result).to.haveOwnProperty('updatedOn');
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('createEntity function', () => {
    it('should create an Entity record', (done) => {
      entityService.createEntity(userInput).then((result) => {
        expect(result).to.exist;
        expect(result.id).to.exist;
        expect(result.createdOn).to.exist;
        expect(result.updatedOn).to.be.null;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('updateEntity function', () => {
    it('should update an Entity record', (done) => {
      entityService.updateEntity(userInput).then((result) => {
        expect(result).to.exist;
        expect(result.updatedOn).to.exist;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
  describe('deleteEntity function', () => {
    it('should return undefined', (done) => {
      entityService.deleteEntity(userInput).then((result) => {
        expect(result).to.be.undefined;
        done();
      }).catch((err) => {
        done(err);
      });
    });
  });
});
