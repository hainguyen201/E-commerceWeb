const session = require('../models/session.model')
const user = require('../models/user.model')
const USER_DEFAULT = 0
exports.getRole = async(req, result) => {

    var coookie = req.headers.cookie;
    await session.getSessionByID(coookie, async(err, data) => {
        if (err) {
            //show err
        } else {
            if (data.UserID != 0) {
                await user.findById(data.UserID, (err, data) => {
                    if (err) {
                        //show er
                    } else {
                        result = data.Role
                    }
                })
            } else {
                result = USER_DEFAULT;
            }
        }
    })
}