const Order = require('../models/order.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')


/**
 * Lấy đơn hàng qua ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.getOrderByID = async(req, res, param) => {
    await Order.getOrderByID(param, (err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            var data = {
                success: true,
                data: data
            }
            abstractController.sendData(res, data);
        }
    })
}

/**
 * Cập nhật đơn hàng
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.updateOrder = async(req, res, param) => {
    await Order.updateOrder(param, req.body, (err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            var data = {
                success: true,
                data: data
            }
            abstractController.sendData(res, data)
        }
    })
}

/**
 * Thêm đơn hàng
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.addOrder = async(req, res, param) => {
    await Order.addOrder(req.body, (err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            var data = {
                success: true,
                data: data
            }
            abstractController.sendData(res, data)
        }
    })
}

/**
 * Xóa đơn hàng
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.deleteOrder = async(req, res, param) => {
    await Order.deleteOrder(param, (err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            var data = {
                success: true,
                data: data
            }
            abstractController.sendData(res, data)
        }
    })
}