const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Healthcheck API', () => {
  describe('GET /ping', () => {
    it('should return pong', (done) => {
      chai.request(app).get('/ping')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.a('string');
          res.text.should.equal('PONG');

          done();
        });
    });
  });

  describe('GET /healthcheck', () => {
    it('should return 200', (done) => {
      chai.request(app).get('/healthcheck')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
