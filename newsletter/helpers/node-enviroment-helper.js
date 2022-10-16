const path = require('path');
const ejs = require('ejs');
function configureToRenderHTMLAnsEJS(application, express) {
    application.engine('html', ejs.renderFile);
    application.set('view engine', 'html');
    application.use('/public', express.static(path.join(__dirname, '../public')));
    application.set('views', path.join(__dirname, '../pages'));
}

const parser = require('body-parser');
function configureJSONParser(application) {
    application.use(parser.json());
    application.use(parser.urlencoded({ extended: true }));
}

function configureEnviroment(application, express) {
    configureToRenderHTMLAnsEJS(application, express);
    configureJSONParser(application);
}

function configureListen(application) {
    const selectedPort = 8080
    const impriveServerIsOn = console.log('Server is ON!')
    application.listen(selectedPort, impriveServerIsOn);
}

exports.configureEnviroment = configureEnviroment;
exports.configureListen = configureListen;