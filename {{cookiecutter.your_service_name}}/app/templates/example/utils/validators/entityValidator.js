const { checkSchema, validationResult } = require('express-validator');

const { BadRequestError } = require('../error');

const sanitizeString = (value) => escape(value.trim());

const createEntity = checkSchema({
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'must be a string',
    },
    customSanitizer: {
      options: (name) => (typeof name === 'string' ? sanitizeString(name) : name),
    },
    // check length after string has been sanitized to ensure it is not empty
    isLength: {
      errorMessage: 'must have length of at least 1',
      options: { min: 1 },
    },
  },
  color: {
    in: ['body'],
    custom: {
      options: (color) => (['red', 'green', 'blue'].includes(color)),
      errorMessage: 'must be red, green, or blue',
    },
  },
});

const updateEntity = checkSchema({
  id: {
    in: ['params'],
    errorMessage: 'must have valid id',
  },
  name: {
    in: ['body'],
    isString: {
      errorMessage: 'must be a string',
    },
    customSanitizer: {
      options: (name) => (typeof name === 'string' ? sanitizeString(name) : name),
    },
    // check length after string has been sanitized to ensure it is not empty
    isLength: {
      errorMessage: 'must have length of at least 1',
      options: { min: 1 },
    },
  },
  color: {
    in: ['body'],
    custom: {
      options: (color) => (['red', 'green', 'blue'].includes(color)),
      errorMessage: 'must be red, green, or blue',
    },
  },
});

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = new BadRequestError('Invalid Params', errors.array());
    errorObj.statusCode = 400;
    next(errorObj);
  }
  next();
};

module.exports = {
  createEntity,
  updateEntity,
  validate,
};
