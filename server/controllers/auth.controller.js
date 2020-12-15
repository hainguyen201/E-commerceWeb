const session = require('../models/session.model')
const user = require('../models/user.model')
const USER_DEFAULT = 0
exports.getRole = async(req, result) => {

    var cookie = req.headers.cookie;
    console.log(cookie)
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