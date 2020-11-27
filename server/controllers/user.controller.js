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
exports.findByUserName = (req, res) => {
    User.findByUserName(req.body, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(length(data))
            if (length(data) > 0)
                abstractController.sendData(res, data);
            else {
                abstractController.sendData(res, "that bai");
            }
        }
    })
}
exports.loginAction = async(req, res, param) => {
    this.findOne(req, res, req.body.UserName)
}