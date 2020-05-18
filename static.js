const express = require('express');
const server = express();
const _PORT = 5000;

server.use(express.static(__dirname));

server.listen(_PORT, () => console.log(`Running at ${_PORT}`));