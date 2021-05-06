const express = require('express')
var app = express()
const morgan = require('morgan');
const bodyParser = require('body-parser')

const route = require('./router')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Acess-Control-Allow-origin', '*');
    res.header(
        'Acess-Control-Allo-Header',
        'Origin, X-Request-With, Content-Type, Accept, Authorization'
        );

     if (req.method === 'OPTIONS') {
         res.header('Acess-Control-Allow-methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).send({});
     }   
     next();
})


app.use('/', route);


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    });
});

module.exports = app;