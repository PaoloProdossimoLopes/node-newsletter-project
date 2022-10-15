// Export nescessary dependencies
const express = require('express');
const enviromentHelper = require('./helpers/node-enviroment-helper.js');

// Configure Express
const application = express();
enviromentHelper.configureEnviroment(application, express);

// Rotas:
configureRoute(application);

// Ouvindo a porta 8080
enviromentHelper.configureListen(application);

function configureRoute(application) {
    application.get('/', (request, response) => {
        response.send('Home');
    })
    
    application.get('/:slug', (request, response) => {
        response.send('Artigo:', request.params.slug);
    })
}