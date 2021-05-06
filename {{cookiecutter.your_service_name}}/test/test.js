"use strict";
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('generator:test', function() {
  const appName = 'test-app';
  const appVersion = '1.0.1';
  const appPort = 5000;
  const authorname = 'Test Name';

  const commonOutput = [
    'Dockerfile',
    'package.json',
    'README.md',
    '.env',
    '.eslintrc.js',
    '.dockerignore',
    '.gitignore',
    'index.js',
    'api/index.js',
    'api/routes/entity.api.js',
    'api/routes/healthcheck.api.js',
    'config/config.js',
    'database/db.js',
    'models/entity.js',
    'scripts/build-docker',
    'scripts/serve-docker',
    'services/entity.service.js',
    'test'
  ]

  beforeEach(function() {
    return helpers.run(path.join(__dirname, "../app")).withPrompts({
      name: appName,
      port: appPort,
      authorname: authorname,
      version: appVersion
    });
  });

  it('generates all template files', function() {
    assert.file(commonOutput);
  });

  it('generates package.json with correct file contents', function() {
    assert.jsonFileContent('package.json', {
      name: appName
    });
    assert.jsonFileContent('package.json', {
      version: appVersion
    });
    assert.jsonFileContent('package.json', {
      author: {
        name: authorname
      }
    });
  });

  it('generates .env with correct file contents', function() {
    assert.fileContent('.env', `PORT=${appPort}`);
  });

});
