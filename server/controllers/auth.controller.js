const session = require('../models/session.model')
const user = require('../models/user.model')
const helper = require('../utils/helper')
const abstracontroller = require('./abstract.controller')
const USER_DEFAULT = 0
exports.getRole = async(req, result) => {
    var cookie = req.headers.cookie.replace('sessionid=', "");
    console.log("cookie: ", cookie)

    await session.getSessionByID(cookie, async(err, data) => {
        console.log(data)
        if (err) {
            //show err
            result(err, data)
        } else {
            if (data.length > 0 && data[0].UserID != 0) {
                await user.findById(data[0].UserID, (err, data) => {
                    if (err) {
                        //show er
                    } else {
                        console.log(data)
                        result(null, data[0].Role)
                    }
                })
            } else {
                result(null, 0);
            }
        }
    })
}
exports.UserAuth = async(req, res) => {
    debugger
    var cookie = helper.cookieparser(req.headers.cookie);
    await session.getSessionByID(cookie.sessionid, async(err, data) => {
        if (err) {
            debugger
        } else {
            debugger
            var userid = data[0].UserID;
            await user.findById(userid, (err2, data2) => {
                if (err2) {

                } else {
                    abstracontroller.sendData(res, data2);
                }
            })
        }
    });

}