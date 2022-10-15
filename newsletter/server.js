// Export nescessary dependencies
const express = require('express');
const enviromentHelper = require('./helpers/node-enviroment-helper.js');

// Configure Express
const application = express();
enviromentHelper.configureEnviroment(application, express);

// Rotas:
application.get('/', (request, response) => {
    response.status(200).send('Home');
})

application.get('/:slug', (request, response) => {
    response.status(200).send(`Artigo: ${request.params.slug}`);
})

// Ouvindo a porta 8080
enviromentHelper.configureListen(application);