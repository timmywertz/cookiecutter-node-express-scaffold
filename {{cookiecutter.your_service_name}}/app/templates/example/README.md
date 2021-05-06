# Express Scaffold

## Running the Application

Ensure you have a `.env` file at the root of the application with the `PORT`: {{cookiecutter.development_port_of_service}}. The default value for `PORT` is 8080.

```bash
npm install
npm run start
```

API Documentation can be found at `http://localhost:{{cookiecutter.development_port_of_service}}/api/api-docs`.

## Configuration

- All configuration settings should be placed in `/config/config.js`.
- Settings should be grouped together inside an exportable object.
- `serverSettings` has been added which exposes the port the application should run on.

#### Default Values

If you would like to run the application without a `.env` file, values in `config.js` should be changed to following format:
`port = process.env.PORT || 8080;`

## API

The `/api` directory consists of the following:

```
/routes
index.js
```

`/routes` will hold the implementation of your api. Two files have been set up: `entity.api.js` and `healthcheck.api.js`.

The entity api contains RESTful endpoints for interacting with `Entity` data.

The healthcheck api contains any routes that will be used to check application status. Two have been added: `/ping` and `/healthcheck`

`index.js` is where your routes should be added to an instance of an express router and exported

### Validation

`/utils/validators` holds api validation middleware. [Express-validator](https://express-validator.github.io/docs/) has been set up to validate the entity.api
