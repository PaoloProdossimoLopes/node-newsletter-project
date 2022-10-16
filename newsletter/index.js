const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const mongoose = require('mongoose');
const dataBaseUsername = '{replace_your_usename}'
const dataBasePassword = '{replace_your_password}'
const dataBaseName = 'newsletter-dankicode-course'
const dataBaseURL = `mongodb+srv://${dataBaseUsername}:${dataBasePassword}@cluster0.egdren5.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`
const Posts = require('./models/Posts.js');

mongoose.connect(dataBaseURL).then((_) => {
    //Block execute when acess succeds
    console.log('DEBUG: Conectado com sucesso!');
}).catch((error) => {
    //Block execute when access fails
    console.log(`DEBUG: Erro (${error.message}) ao conectar!`);
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/',(req,res)=>{
    
    if(req.query.busca == null){

        Posts.find({}).exec((error, posts) => {
            console.log(posts[0]);
        })

        res.render('home',{});
    }else{
        res.render('busca',{});
    }
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    res.render('single',{});
})



app.listen(5000,()=>{
    console.log('server rodando!');
})