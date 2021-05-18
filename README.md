# Cookiecutter Node Express Scaffold

This repository contains the code used to generate a sample React application using Cookiecutter.

## Prerequisites

Tools you will need:

- [Git](https://git-scm.com/)
- [Node](https://nodejs.org/en/)
- [NPM](https://npmjs.com/) (installed with Node)
- Code editor or IDE

Technologies you should be familiar with:

- [Python](https://python.org/)
- [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/README.html/)

## Step 1: Check if you need to install pip

Run the following command to verify if pip is installed:

```bash
python -m pip --version
```

If pip is installed it should return:

```bash
pip X.Y.Z from .../site-packages/pip (python X.Y)
```

Otherwise follow these [directions](https://pip.pypa.io/en/stable/installing/) from pip.

## Step 2: Use pip to Install [Cookiecutter](https://cookiecutter.readthedocs.io/en/latest/README.html/)

Run the following command to install Cookiecutter globally.

```bash
 pip install cookiecutter
```

## Step 3: Generate the Cookiecutter project

```bash
cookiecutter https://github.com/timmywertz/cookiecutter-node-express-scaffold.git
```

If you have already downloaded it before, it will read: "You have downloaded /Users/johnsmith/.cookiecutters/cookiecutter-node-express-scaffold before. Is it okay to delete and re-download it? [yes]"

Then you will be prompted with the following questions. There are default values suggested, but we recommend that you update at least `<your_service_name>` and `<author_name>` to represent your project's details.

```bash
your_service_name: `users`,
development_port_of_service: `8080`,
author_name: `First Last`,
version: `0.0.1`,
project_name: `users`,
repo_name: `users`
```

## Step 4: Navigate to newly generated Node Express project.

```bash
cd <your_service_name>
```

## Step 5: Install project dependencies

```bash
npm install
```

## Step 6: Start Project

```bash
npm start
```

## Use the following command to execute the test suites via [Mocha](https://mochajs.org/):

```bash
npm run test
```

## To generate test coverage metrics:

```bash
npm run coverage
```
