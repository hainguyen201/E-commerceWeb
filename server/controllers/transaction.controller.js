const { USER } = require('../config/db.config')
const transaction = require('../models/transaction.model')
const headers = require('../config/header.config')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
const uuid = require('uuid')
const session = require('../models/session.model')
const Order = require('../models/order.model')
const Transaction = require('../models/transaction.model')
const ProductOrder = require('../models/productorder.model')
const auth = require('./auth.controller')

exports.getAllTransaction = async(req, res, param) => {
    await auth.getRole(req, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            if (data == 1) {
                await Transaction.getAllTransaction(async(err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err)
                    } else {
                        abstractController.sendData(res, data)
                    }
                })
            } else {
                abstractController.sendAuth(res);
            }
        }
    })
}

/**
 * Lấy transaction thông qua userID
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */

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


/**
 * Lấy transaction thông qua section
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */

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


/**
 * Xác nhận transaction bằng userID
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
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
                await ProductOrder.getPriceByOrderID(orderID, async(err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err);
                    } else {
                        transaction_add.Payment = data[0].Payment;
                        console.log(transaction_add.Payment);
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
                    }
                })


            } else {
                abstractController.sendErr(res, { message: 'Không tìm thấy giỏ hàng' })
            }
        }
    })
}


/**
 * Xác nhận transaction thông qua section
 * @param {*} req 
 * @param {*} res 
 * @param {*} paran 
 */
exports.confirmTransactionBySession = async(req, res, paran) => {
    var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
    var transaction_add = req.body;
    transaction_add.SessionID = sessionid;
    await session.getSessionByID(sessionid, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err)
        } else {
            if (data.length > 0) {
                var orderID = data[0].OrderID;
                await ProductOrder.getPriceByOrderID(orderID, async(err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err);
                    } else {
                        transaction_add.Payment = data[0].Payment;
                        console.log(transaction_add.Payment);
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
                                        await session.updateSession(sessionid, {}, async(err, data) => {
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
                    }
                })

            } else {
                abstractController.sendData(res, data)
            }
        }
    })
}

/**
 * Cập nhật giao dịch bằng ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.updateTransactionByTransactionID = async(req, res, param) => {
    var transactionid = param;
    var transaction_update = req.body;
    //nếu có cập nhật trường trạng thái thì kiểm tra role trước
    if (transaction_update.TransactionStatus) {
        await auth.getRole(req, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err);
            } else {
                console.log(data)
                if (data == 1) {
                    await Transaction.updateTransactionByID(transactionid, transaction_update, async(err, data) => {
                        if (err) {
                            abstractController.sendErr(res, err)
                        } else {
                            abstractController.sendData(res, data)
                        }
                    })
                } else {
                    abstractController.sendAuth(res);
                }
            }
        })
    } else {
        await Transaction.updateTransactionByID(transactionid, transaction_update, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err)
            } else {
                abstractController.sendData(res, data)
            }
        })
    }

}