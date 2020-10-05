const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const server = express();
const PORT = process.env.PORT || 8081;

server.use((request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.set('Access-Control-Allow-Headers', 'X-CUSTOM, Authorization, Content-Type');
    next();
});

const upload = multer();
const formParser = upload.fields([]);
const jsonParser = bodyParser.json();
const textParser = bodyParser.text();

server.post('/', [formParser, jsonParser, textParser], (request, response) => {
    try {
        response.write(JSON.stringify({ headers: request.headers, body: request.body }));
    } catch (error) {
        response.status(500).send(error);
    } finally {
        response.end();
    }
});

server.get('/encrypt', async (request, response) => {
    if (request.headers.authorization) {
        const encrypt = await bcrypt.hash(request.headers.authorization, 10);
        response.status(200).send({ 'criptografia': JSON.stringify(encrypt) });
    }
    response.end();
});

server.post('/auth', [formParser, jsonParser, textParser], async (request, response) => {
    try {
        const pass = "bandtec@2020";
        const incomingPass = await bcrypt.hash(request.body.message, 10);
        const hasAccess = await bcrypt.compare(pass, incomingPass);
        if (hasAccess) {
            response.status(200).write(JSON.stringify({ message: "Logado com sucesso!" }));
        } else {
            response.status(401).write(JSON.stringify({ message: "Acesso não autorizado!" }));
        }
    } catch (error) {
        response.status(500).send(error);
    } finally {
        response.end();
    }
});

server.listen(PORT, () => console.log(`Running at ${PORT}`));