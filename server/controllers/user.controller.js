const { USER } = require('../config/db.config')
const User = require('../models/user.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
const uuid = require('uuid')
const session = require('../models/session.model')
    /**
     * Lấy toàn bộ user
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findAll = (req, res, param) => {
        User.getAll((err, data) => {
            var message = {
                success: "Thêm user thành công",
                fail: "Thêm thất bại, liên hệ admin"
            }
            this.resultHandler(err, data, req, res, message)
        })
    }
    /**
     * Tim user theo id
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findOne = (req, res, param) => {
        User.findById(param, (err, data) => {
            var message = {
                success: "lấy thông tin user thành công",
                fail: "Lấy thông tin user thất bại, liên hệ admin"
            }
            this.resultHandler(err, data, req, res, message)
        })
    }
    /**
     * Cập nhật User
     * @param {*} req 
     */
exports.updateUser = async(req, res, param) => {
        await User.updateUser(param, req.body, (err, data) => {
            var message = {
                success: "Cập nhật user user thành công",
                fail: "cập nhật user thất bại, liên hệ admin"
            }

            this.resultHandler(err, data, req, res, message)
        })
    }
    /**
     * Tìm kiếm User theo username
     * @param {*} req 
     * @param {*} res 
     */
exports.findByUserName = async(req, res, param) => {

    await User.findByUserName(req.body, async(err, data) => {
        var message = {
            success: "Lấy thông tin user thành công",
            fail: "Lấy thông tin user thất bại, liên hệ admin"
        }
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            if (data.length > 0) {
                var cookie = helper.cookieparser(req.headers.cookie)
                console.log("cookie: ", cookie.sessionid)
                await session.updateSession(cookie.sessionid, { UserID: data[0].UserID }, (er, data2) => {
                    if (er) {
                        abstractController.sendErr(res, er)
                    } else {
                        console.log(data2)
                        this.resultHandler(err, data, req, res, message)
                    }
                })
            } else {
                abstractController.sendAuth(res)
            }
        }

    })
}
exports.logout = async(req, res, param) => {
        var sessionid = uuid.v1();
        console.log("logout id: ", session)
        await session.addSession({ SessionID: sessionid }, async(err, data) => {
            if (err) {

            } else {
                res.setHeader("set-cookie", [`sessionid=${sessionid}; path=/; samesite=None; Secure `])
                await abstractController.sendAuth(res)
            }

        })

    }
    /**
     * Thêm User
     * @param {*} req 
     * @param {*} res 
     */
exports.addUser = async(req, res) => {
    User.addUser(req.body, (err, data) => {
        var message = {
            success: "Thêm user thành công",
            fail: "Thêm thất bại, liên hệ admin"
        }
        this.resultHandler(err, data, req, res, message)
    })
}
exports.deleteUser = async(req, res, param) => {
    User.deleteUser(param, (err, data) => {
        var message = {
            success: "Xóa user thành công",
            fail: "Xóa thất bại, liên hệ admin"
        }
        this.resultHandler(err, data, req, res, message)
    })
}
exports.resultHandler = (err, data, req, res, message) => {
    if (err)
        abstractController.sendErr(res, err)
    else {
        var dt = {
            data: data,
            success: false
        }
        if (data) {
            dt.success = true
            dt.message = message.success
        } else {
            dt.message = message.fail
        }
        abstractController.sendData(res, dt);
    }
}
>>>>>>> 47f93aeb05d2b50b9906cbeae1a44b0e249baed7
