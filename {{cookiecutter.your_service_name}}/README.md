# Sample Express Scaffold Using Cookiecutter

This repository contains the code used to generate a sample Node and Express API application using Cookiecutter.

# Prerequisites

## Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

export NVM_DIR="/Users/your-user-name/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Install node using nvm:

```bash
nvm install stable
```

```bash
nvm use node
```

## Install [Yeoman](https://yeoman.io/):

```bash
npm install -g yo
```

## Install the UIP Express generator

```bash
cd cookiecutter-node-express-scaffold

npm link
```

# Installing the sample express app

## Run

- From a **NEW** terminal instance run:

  ```bash
  cookiecutter cookiecutter-node-express-scaffold
  ```

Follow the instructions in the terminal

# Optional

## Deploying Using Docker

The Sample Dockerfile provided is the most basic configuration needed to build docker image.

## Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop)
- Project created using the `cookiecutter` script
- Connect to F5 VPN

## Setup

- Ensure Docker is running and you are connected to the VPN
- Build the container

  - In the root directory of the generated project (the app you created using the yo uip-express script, not the root directory of the repository) update scripts/docker-build and scripts/docker-serve with your {{cookiecutter.your_service_name}} and {{cookiecutter.development_port_of_service}}.

    - where `appName`: {{cookiecutter.your_service_name}} is the desired name of your image, and `port`: {{cookiecutter.development_port_of_service}} is the port you wish the service to run on.

  - then run:
    ```bash
    npm run docker-build
    ```

- Run the container:
  ```bash
  npm run docker-serve
  ```

# Contributing

## [The Scaffold](./app)

- The place to add more templates that the user can generate.

## [The Express Template](./app/templates/example/)

- Example Express application
