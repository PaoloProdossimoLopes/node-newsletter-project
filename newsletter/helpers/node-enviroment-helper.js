const path = require('path');
const ejs = require('ejs');
function configureToRenderHTMLAnsEJS(application, express) {
    application.engine('html', ejs.renderFile);
    application.set('view engine', 'html');
    application.use('/public', express.static(path.join(__dirname, 'public')));
    application.set('views', path.join(__dirname, 'views'));
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

exports.configureEnviroment = configureEnviroment;