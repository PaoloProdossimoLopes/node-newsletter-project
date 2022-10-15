// Export nescessary dependencies
const express = require('express');
const helper = require('./helpers/node-enviroment-helper.js');

// Configure Express
const application = express();
helper.configureEnviroment(application, express);

// Rotas:
application.get('/', (request, response) => {
    response.status(200).send('Home');
})

application.get('/:slug', (request, response) => {
    const slug = request.params.slug;
    response.status(200).send(`Artigo: ${slug}`);
})

// Ouvindo a porta 8080
helper.configureListen(application);