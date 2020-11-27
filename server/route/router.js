const helpers = require('../utils/helper')
const { parse } = require('querystring');

module.exports = async(req, res, routes) => {
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
        param = req.url.match(route.path)[1];
    }
    if (route) {
        let body = null
        if (req.method === 'POST' || req.method === 'PUT') {
            body = await getPostData(req)
                // console.log("inbody", body.Name)
                // console.log("type: ", typeof body)
                // var obj = JSON.parse(body);
                // console.log('json parse: ', JSON.parse(body))
                // console.log('name: ', obj.Name)
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
                //console.log("body", body)
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