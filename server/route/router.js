const helpers = require('../utils/helper')
const { parse } = require('querystring');
const { get } = require('http');

module.exports = async(req, res, routes) => {
    // if (req.method) {
    //     if (req.method == "OPTIONS") {
    //         req.method = "POST"
    //     }
    // }
    // var body = await getPostData(req)
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        let pathMatch = false;

        if (typeof route.path === 'object') {
            // Path is a RegEx, we use RegEx matching
            pathMatch = req.url.match(route.path)
        } else {
            // Path is a string, we simply match with URL
            pathMatch = route.path === req.url
        }

        return pathMatch && methodMatch;

    })

    let param = null;

    if (route && typeof route.path === 'object') {
        var length = req.url.match(route.path).length;
        var params = req.url.match(route.path);
        if (length > 1) {
            param = params[length - 1] + ' '
            length -= 1
        }
        while (length > 1) {
            param += params[length - 1] + ' ';
            length -= 1;
        }
        param = param.slice(0, -1)

    }
    if (route) {
        let body = null
        if (req.method === 'POST' || req.method === 'PUT' && req.method != 'OPTIONS') {
            body = await getPostData(req)
        }
        var sessionId = req.cookie;
        if (sessionId) {

        }
        return route.handler(req, res, param)
    } else {
        return helpers.error(res, 'Endpoint not found', 404)
    }
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
                req.body = body
            });

            req.on('end', () => {
                //resolve(parse(body));
                req.body = JSON.parse(body)
                resolve(body);
            });
        } catch (e) {
            reject(e);
        }
    });
}