const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const routes = require('./route/routes');
const router = require('./route/router');

const server = http.createServer(async (req, res) => {
  await router(req, res, routes);
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
