// Export nescessary dependencies
const express = require('express');
const enviromentHelper = require('./helpers/node-enviroment-helper.js');

// Configure Express
const application = express();
enviromentHelper.configureEnviroment(application, express);

//Rotas:
application.get('/', (request, response) => {
    response.send('Home')
})

application.get('/:slug', (request, response) => {
    console.log('DEBUG:', request.params.slug);
    response.send('Artigo')
})

// Ouvindo a porta 8080
application.listen(8080, () => {
    console.log('Server is ON!')
});