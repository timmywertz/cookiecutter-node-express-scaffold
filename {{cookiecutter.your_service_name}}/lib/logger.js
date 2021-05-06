const winston = require('winston');

const options = {
  console: {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  defaultMeta: { service: 'entity-service' },
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }),
    winston.format.printf((info) => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}${info.splat !== undefined ? `${info.splat}` : ' '}`),
  ),
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

// Add stream property for integration with morgan
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
