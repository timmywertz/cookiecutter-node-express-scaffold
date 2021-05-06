const dotenv = require('dotenv');

const envFound = dotenv.config();

if (envFound.error) {
  // console.log('env not found');
}

const serverSettings = {
  port: Number.parseInt(process.env.PORT, 10) || 8080,
};

module.exports = { serverSettings };
