const http = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');
const uuid = require('uuid')

const routes = require('./route/routes');
const router = require('./route/router');
const session = require('./models/session.model');
const { Session } = require('inspector');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
const server = http.createServer(options, async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "http://127.0.0.1:5000");
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Content-Type', "application/json")
        // res.setHeader('Access-Control-Allow-Methods', "*");
        // res.setHeader('Access-Control-Allow-Headers', "*");
        // console.log(req.headers)
        // res.setHeader('Cookie', "sessionid: 1234")

    if (req.method == "OPTIONS") {
        res.setHeader('Access-Control-Allow-Methods', "*");
        res.setHeader('Access-Control-Allow-Headers', "Credentials,Access-Control-Allow-Origin, Content-Type");
        res.statusCode = 200;
        res.end();
    } else {
        if (!req.headers.hasOwnProperty('cookie')) {
            var ss = { SessionID: uuid.v1() }
            console.log(ss.SessionID)
            await session.addSession(ss, async(err, data) => {
                if (err) {
                    console.log("er: ", err)
                } else {
                    res.setHeader('set-cookie', [`sessionid=${ss.SessionID};samesite=None; Secure`])
                    await router(req, res, routes);
                }
            })
        } else {
            console.log("cookie", req.headers.cookie)
            await router(req, res, routes);
        }

    }

})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})