const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const routes = require('./route/routes');
const router = require('./route/router');

const server = http.createServer(async(req, res) => {
    // const header = {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, DELETE, PUT',
    //     'Access-Control-Allow-Headers': '*'
    // }
    console.log(req.method)
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    if (req.method == "OPTIONS") {
        res.statusCode = 204;
        res.end();
    }
    await router(req, res, routes);
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})