const { expect } = require('chai');
const sinon = require('sinon');
const { BadRequestError } = require('../../utils/error');

const handleErrorMiddleware = require('../../utils/handleError');

const mockErrorObj = new Error('test');
const mockBadRequestErrorObj = new BadRequestError('test', []);

const mockResponse = () => {
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);

  return res;
};

describe('Handle Error Middleware', () => {
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(handleErrorMiddleware).to.be.a('function');
    });

    it('should accept four arguments', () => {
      expect(handleErrorMiddleware.length).to.equal(4);
    });
  });

  describe('request handler calling', () => {
    describe('called with error', () => {
      it('should set correct status code on response object', () => {
        const nextSpy = sinon.spy();
        const mockRes = mockResponse();
        handleErrorMiddleware(mockErrorObj, {}, mockRes, nextSpy);
        expect(mockRes.status.calledWith(500)).to.equal(true);

        handleErrorMiddleware(mockBadRequestErrorObj, {}, mockRes, nextSpy);
        expect(mockRes.status.calledWith(400)).to.equal(true);
      });

      it('should not call next()', () => {
        const nextSpy = sinon.spy();
        const mockRes = mockResponse();
        handleErrorMiddleware(mockErrorObj, {}, mockRes, nextSpy);
        expect(nextSpy.called).to.equal(false);
      });
    });

    describe('called without error', () => {
      it('should call next() once', () => {
        const nextSpy = sinon.spy();
        handleErrorMiddleware(null, {}, {}, nextSpy);
        expect(nextSpy.calledOnce).to.equal(true);
      });
    });
  });
});
