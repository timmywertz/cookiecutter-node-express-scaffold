const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../index');

const db = require('../../database/db');
const Entity = require('../../models/entity');

const entity = new Entity();

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Entity API', () => {
  beforeEach(() => {
    // clear out db before each test
    db.records = [];
  });
  describe('GET /entities', () => {
    it('should get all entities', (done) => {
      chai.request(app).get('/entities')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('GET /entities/:id', () => {
    it('should get an entity by a given id', (done) => {
      entity.create({ name: 'test', color: 'blue' }).then((data) => {
        chai.request(app).get(`/entities/${data.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('color');
            res.body.data.should.have.property('createdOn');
            res.body.data.should.have.property('updatedOn');
            res.body.data.should.have.property('id').eql(data.id);
            done();
          });
      });
    });
  });
  describe('POST /entities', () => {
    it('should return 400 when parameters are missing', (done) => {
      chai.request(app).post('/entities')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.should.have.property('details');
          done();
        });
    });
    it('should create an Entity', (done) => {
      const reqBody = { name: 'mock', color: 'green' };

      chai.request(app).post('/entities')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('name');
          res.body.data.should.have.property('color');
          res.body.data.should.have.property('createdOn');
          res.body.data.should.have.property('updatedOn');
          res.body.data.should.have.property('id');
          done();
        });
    });
  });
  describe('PUT /entities/:id', () => {
    it('should return 400 when parameters are missing', (done) => {
      chai.request(app).put('/entities/123')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          res.body.should.have.property('details');
          done();
        });
    });
    it('should update an Entity', (done) => {
      entity.create({ name: 'test', color: 'blue' }).then((data) => {
        const reqBody = { name: 'update', color: 'green' };

        chai.request(app).put(`/entities/${data.id}`)
          .send(reqBody)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('name').eql(reqBody.name);
            res.body.data.should.have.property('color').eql(reqBody.color);
            res.body.data.should.have.property('createdOn').eql(data.createdOn);
            res.body.data.should.have.property('updatedOn').be.a('number');
            res.body.data.should.have.property('id').eql(data.id);
            done();
          });
      });
    });
  });
  describe('DELETE /entities/:id', () => {
    it('should delete an Entity', (done) => {
      entity.create({ name: 'test', color: 'blue' }).then((data) => {
        chai.request(app).delete(`/entities/${data.id}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
