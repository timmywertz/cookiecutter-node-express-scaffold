const editJsonFile = require('edit-json-file');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const os = require('os');
const validate = require('validate-npm-package-name');
const yosay = require('yosay');

const appNameBlacklist = ['test', 'app'];
const currentApps = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter((potentialDir) => potentialDir.isDirectory())
  .map((directory) => directory.name);

const inputPrompts = [
  {
    type: 'input',
    name: 'name',
    message: 'Your service name (Eg: users): ',
    validate: function (input) {
      if (
        !validate(input).validForNewPackages ||
        appNameBlacklist.includes(input) ||
        currentApps.includes(input)
      ) {
        return 'The name is not a valid application name or already exists in the current directory. Please choose a valid name i.e. my-application-name';
      }
      return true;
    },
  },
  {
    type: 'number',
    name: 'port',
    message: 'Development port of service',
    default: 8080,
    validate: function (input) {
      const portNumber = +input;
      var portNumberValid = portNumber >= 1 && portNumber <= 65535;
      if (!portNumberValid) {
        return 'This is not a valid HTTP port number. Please choose a valid port i.e. 8080';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'authorname',
    message: 'Author Name (Eg: First Last): ',
    validate: function (input) {
      var validName = /^(?! )((?!  )(?! $)[a-zA-Z0-9 ]){3,64}$/.test(input);
      if (!validName) {
        return 'Not a valid author name.  Max length is 64 characters.  Trailing or Forward spaces not allowed.';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version: ',
    default: '0.0.1',
    validate: function (input) {
      var validVersion = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(\-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/.test(
        input
      );
      if (!validVersion) {
        return 'This is not a valid version number.';
      }
      return true;
    },
  },
];

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay('You are about to create a BAH Express application.'));

    this.answers = await this.prompt(inputPrompts);
  }

  writing() {
    this.log('Copying files...');
    mkdirp.sync(this.answers.name);

    this.fs.copy(
      this.templatePath('example'),
      this.destinationPath(`${this.answers.name}`)
    );

    // yeoman will not pick up this file, must explicitly copy
    this.fs.copy(
      this.templatePath('example/.eslintrc.js'),
      this.destinationPath(`${this.answers.name}/.eslintrc.js`)
    );

    // yeoman will not pick up this file, must explicitly copy
    this.fs.copy(
      this.templatePath('example/.dockerignore'),
      this.destinationPath(`${this.answers.name}/.dockerignore`)
    );

    // yeoman will not pick up this file, must explicitly copy
    this.fs.copy(
      this.templatePath('example/.gitignore'),
      this.destinationPath(`${this.answers.name}/.gitignore`)
    );

    // yeoman will not pick up this file, must explicitly copy
    this.fs.copy(
      this.templatePath('example/LICENSE.md'),
      this.destinationPath(`${this.answers.name}/LICENSE.md`)
    );

    // create .env file with default values
    const contentsForDotEnvFile =
      `PORT=${this.answers.port}\n`;

    this.fs.write(
      this.destinationPath(`${this.answers.name}/.env`),
      contentsForDotEnvFile
    );
  }

  /* Update file properties and install dependencies */
  install() {
    // update files with user's choices
    this.log('Updating project based on inputs...');

    this.replaceJSONProps(
      `${this.answers.name}/package.json`,
      ['version', 'name', 'author.name'],
      [this.answers.version, this.answers.name, this.answers.authorname]
    );

    this.log('Installing dependencies...');
    process.chdir(this.answers.name);

    this.npmInstall();
  }

  /* Output to the user to help them get started */
  end() {
    this.log(`Service ${this.answers.name} created.`);
    this.log('');
    this.log('To run: npm run start');
    this.log('');
    this.log('To lint the code: npm run lint');
    this.log('');
    this.log('To run the unit tests: npm run test');
  }

  /* Helper functions */
  // replace properties in JSON files
  replaceJSONProps(filePath, propertyNames, propertyValues) {
    if (!filePath || filePath[0] == 'undefined') {
      return;
    }
    let file = editJsonFile(filePath);
    propertyNames.forEach((prop, i) => {
      file.set(prop, propertyValues[i]);
    });
    file.save();
  }
};
