const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const server = express();
const PORT = process.env.PORT || 8081;

server.use((request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'X-CUSTOM, Content-Type');
    next();
});

const upload = multer();
const formParser = upload.fields([]);
const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

server.post('/', [formParser, jsonParser, textParser], (request, response) => {
    response.write(JSON.stringify({ headers: request.headers, body: request.body }));
    response.end();
});


server.get('/segredo', (request, response) => {
    if (request.headers.token) {
        if (request.headers.token == '1234') {
            response.write(`O segredo é que você se identificou como ${request.headers.token}`);
        } else {
            response.status(403).write(`Eu te conheço mas não posso te contar o segredo`);
        }
    } else {
        response.status(401).write('Não sei quem é você!')
    }
    response.end();
});

server.listen(PORT, () => console.log(`Running at ${PORT}`));