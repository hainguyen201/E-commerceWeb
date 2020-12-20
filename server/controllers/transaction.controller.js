const { USER } = require('../config/db.config')
const transaction = require('../models/transaction.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
const uuid = require('uuid')
const session = require('../models/session.model')
const Order = require('../models/order.model')
const Transaction = require('../models/transaction.model')
exports.getTransactionByUserID = async(req, res, param) => {
    var userid = param;
    await transaction.getTransactionByUserID(userid, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            abstractController.sendData(res, data)
        }
    })
}
exports.getTransactionBySession = async(req, res, param) => {
    var sessionid = helper.cookieparser(req.headers.cookie).sessionid
    await transaction.getTransactionBySessionID(sessionid, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err)
        } else {
            abstractController.sendData(res, data)
        }
    })
}
exports.confirmTransactionByUserID = async(req, res, param) => {
    var transaction_add = req.body;
    var userid = param;
    transaction_add.UserID = userid
        //lấy thông tin giở hàng
    await session.getOrderByUserID(userid, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            console.log(data)
            if (data.length > 0) {
                var orderID = data[0].OrderID;
                //thêm một transaction mới
                await Transaction.addTransaction(transaction_add, async(err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err);
                    } else {
                        //cập nhật trạng thái giỏ hàng
                        var transactionid = data.insertId;
                        await Order.updateOrder(orderID, { TransactionID: transactionid }, async(err, data) => {
                            if (err) {
                                abstractController.sendErr(res, err)
                            } else {
                                //cập nhật id của giỏ hàng trong session
                                await session.updateSessionWithUserID(userid, {}, async(err, data) => {
                                    if (err) {
                                        abstractController.sendErr(res, err);
                                    } else {
                                        abstractController.sendData(res, { message: 'cập nhật thành công' })
                                    }
                                })
                            }
                        })
                    }
                })
            } else {
                abstractController.sendErr(res, { message: 'Không tìm thấy giỏ hàng' })
            }
        }
    })
}