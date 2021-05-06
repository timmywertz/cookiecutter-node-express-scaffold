const { expect } = require('chai');
const sinon = require('sinon');
const logger = require('../../lib/logger');

const logErrorMiddleware = require('../../utils/logError');

const mockErrorObj = new Error('test');
const loggerStub = sinon.stub(logger, 'error');

describe('Log Error Middleware', () => {
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(logErrorMiddleware).to.be.a('function');
    });

    it('should accept four arguments', () => {
      expect(logErrorMiddleware.length).to.equal(4);
    });
  });

  describe('request handler calling', () => {
    it('should call next() once', () => {
      const nextSpy = sinon.spy();
      logErrorMiddleware(mockErrorObj, {}, {}, nextSpy);
      expect(nextSpy.calledOnce).to.equal(true);
    });

    it('should call next() with error parameter', () => {
      const nextSpy = sinon.spy();
      logErrorMiddleware(mockErrorObj, {}, {}, nextSpy);
      expect(nextSpy.calledWith(mockErrorObj)).to.equal(true);
    });

    it('should log stack property of error object', () => {
      logErrorMiddleware(mockErrorObj, {}, {}, () => ({}));
      expect(loggerStub.calledWith(mockErrorObj.stack)).to.equal(true);
    });
  });
});
