const http = require('https');
const path = require('path');
const fs = require('fs');
const url = require('url');
const uuid = require('uuid')
const helper = require('./utils/helper')

const routes = require('./route/routes');
const router = require('./route/router');
const session = require('./models/session.model');
const { Session } = require('inspector');
const { isBuffer } = require('util');
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
        //nếu chưa có cookie
        if (!req.headers.hasOwnProperty('cookie')) {
            //thêm cookie
            var ss = { SessionID: uuid.v1() }
            console.log("ssid", ss.SessionID)
            await session.addSession(ss, async(err, data) => {
                if (err) {
                    console.log("er: ", err)
                } else {
                    res.setHeader('set-cookie', [`sessionid=${ss.SessionID};samesite=None; Secure`])
                    req.headers.cookie = `sessionid=${ss.SessionID}`;
                    await router(req, res, routes);
                }
            })
        } else {
            //nếu có cookie
            var cookie = helper.cookieparser(req.headers.cookie);
            // tim cookie trong db
            await session.getSessionByID(cookie.sessionid, async(err, data) => {
                if (err) {

                } else {
                    //nếu cookie đó có trong db
                    if (data.length > 0) {
                        await router(req, res, routes);
                    } else {
                        //nếu cookie không có trong db
                        //thì thêm cookie vào db
                        var ss = new Session({ SessionID: cookie.sessionid })
                        await session.addSession(ss, async(err2, data2) => {
                            if (err2) {

                            } else {
                                await router(req, res, routes)
                            }
                        })
                    }
                }

            })

        }

    }

})

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})