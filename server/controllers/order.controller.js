const Order = require('../models/order.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
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