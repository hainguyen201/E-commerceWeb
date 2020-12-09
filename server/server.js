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
    res.setHeader('Content-Type', "application/json")
    if (req.method == "OPTIONS") {

        res.setHeader('Access-Control-Allow-Methods', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
        res.statusCode = 200;
        res.end();
    } else {
        await router(req, res, routes);
    }

})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})