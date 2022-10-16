// MARK: - Export nescessary dependencies
const express = require('express');
const helper = require('./helpers/node-enviroment-helper.js');

// MARK: - Configure Express
const application = express();
helper.configureEnviroment(application, express);

// MARK: - Rotas:
application.get('/', (request, response) => {
    const okStatusCode = 200;
    // response.status(okStatusCode).send('Home');

    const containsQuery = (request.query.busca == null);
    if (containsQuery) {
        response.status(okStatusCode).render('home', {});
    } else {
        response.status(okStatusCode).send('Você buscou: ' + request.query.busca);
    }
});


application.get('/:slug', (request, response) => {
    const slug = request.params.slug;
    const okStatusCode = 200;
    response.status(okStatusCode).send(`Artigo: ${slug}`);
});

// MARK: - Ouvindo a porta 8080
helper.configureListen(application);