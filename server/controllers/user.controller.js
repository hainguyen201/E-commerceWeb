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
exports.updateUser = (req, res, param) => {
    let body = '';
    req.on('data', chunk => {
        console.log(chunk)
    });
    req.on('end', () => {
        console.log(body)
            // User.updateUser(param, body, (err, data) => {
            //     if (err) {

        //     } else {
        //         abstractController.sendData(res, data)
        //     }
        // })
    })

}