const { USER } = require('../config/db.config')
const User = require('../models/user.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
    /**
     * Lấy toàn bộ user
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findAll = (req, res, param) => {
        User.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving customers."
                })
            else {
                abstractController.sendData(res, data)
            }
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
            if (err) {
                if (err.kind === "not_found") {

                } else {

                }
            } else {
                abstractController.sendData(res, data);
            }
        })
    }
    /**
     * Cập nhật User
     * @param {*} req 
     */
exports.updateUser = async(req) => {
        // console.log(req.body.id)
        // console.log(req.body)
        User.updateUser(req.body.id, req.body, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                abstractController.sendData(res, data)
            }
        })
    }
    /**
     * Tìm kiếm User theo username
     * @param {*} req 
     * @param {*} res 
     */
exports.findByUserName = async(req, res) => {
    console.log(req.headers.cookie)
    await User.findByUserName(req.body, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data.length)
            if (data.length > 0) {
                data = {
                    data: data,
                    message: "login success",
                    status: true
                }
                abstractController.sendData(res, data);
            } else {
                data = {
                    data: [],
                    message: "username or password was incorrected",
                    status: false
                }
                abstractController.sendData(res, data);
            }
        }
    })
}
exports.loginAction = async(req, res, param) => {
        this.findOne(req, res, req.body.UserName)
    }
    /**
     * Thêm User
     * @param {*} req 
     * @param {*} res 
     */
exports.addUser = async(req, res) => {
    User.addUser(req.body, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(data)
            if (data) {
                data = {
                    data: data,
                    message: "add success"
                }
                abstractController.sendData(res, data);
            } else {
                data = {
                    message: "error to add user, please contact to admin"
                }
                abstractController.sendData(res, data);
            }
        }
    })
}