const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Posts = require('./models/Posts.js');

const app = express();
const dataBaseURL = makeMongoURL();

connectWithMongo(mongoose, dataBaseURL);

configureParser(app, bodyParser);
configureEngineRender(app, express, path);

configureRoute(app);

configureListen(app);

// Configure application
function configureParser(application, bodyParser) {
    application.use(bodyParser.json()); // to support JSON-encoded bodies
    application.use(bodyParser.urlencoded({ // to support URL-encoded bodies
      extended: true
    })); 
}

function configureEngineRender(application, express, path) {
    application.engine('html', require('ejs').renderFile);
    application.set('view engine', 'html');
    application.use('/public', express.static(path.join(__dirname, 'public')));
    application.set('views', path.join(__dirname, '/pages'));
}

function makeMongoURL() {
    const dataBaseUsername = '{replace_your_usename}';
    const dataBasePassword = '{replace_your_password}';
    const dataBaseName = 'newsletter-dankicode-course';
    const dataBaseURL = `mongodb+srv://${dataBaseUsername}:${dataBasePassword}@cluster0.egdren5.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
    return dataBaseURL;
}

function connectWithMongo(mongoose, url) {
    mongoose.connect(url).then((_) => {
        //Block execute when acess succeds
        console.log('DEBUG: Conectado com sucesso!');
    }).catch((error) => {
        //Block execute when access fails
        console.log(`DEBUG: Erro (${error.message}) ao conectar!`);
    })
}

function configureListen(application) {
    application.listen(5000, console.log('server rodando!'));
}

// MARK: - Routes
function configureRoute(application) {
    configureHomeRoute(application);
    configureHomeSluggedRoute(application);
}

function configureHomeRoute(application) {
    application.get('/',(req,res)=>{
    
        if(req.query.busca == null){
    
            Posts.find({}).exec((error, posts) => {
                console.log(posts[0]);
            })
    
            res.render('home',{});
        }else{
            res.render('busca',{});
        }
    });
}

function configureHomeSluggedRoute(application) {
    application.get('/:slug',(req,res)=>{
        //res.send(req.params.slug);
        res.render('single',{});
    })
}