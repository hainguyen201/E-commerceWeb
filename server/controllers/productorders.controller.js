const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
const abstractController = require('./abstract.controller')
const Product = require("../models/product.model.js")
const Session = require("../models/session.model.js")
const auth = require('./auth.controller')
const productOrder = require('../models/productorder.model')
const order = require('../models/order.model')
const { isBuffer } = require('util')
exports.getProductByOrderID = async(req, res, param) => {
    await productOrder.getProductByOrderID(param, (err, data) => {
        if (err) {
            abstractController.sendErr(res, err)
        } else {
            console.log(data)
            var dt = {
                success: true,
                data: this.productsFormatToClient(data)
            }
            abstractController.sendData(res, dt)
        }
    })
}
exports.productsFormatToClient = function(data) {
    if (data)
        data.forEach(element => {
            if (element.Image.length > 0)
                element.Image = helper.base64_encode(element.Image);
            if (element.ProductCreatedDate)
                element.ProductCreatedDate = helper.formatDate(element.ProductCreatedDate)
            if (element.ProductModifiedDate)
                element.ProductModifiedDate = helper.formatDate(element.ProductModifiedDate)
        });
    return data;
}
exports.updateProductOrderByOrderIDProductID = async(req, res, param) => {
        console.log(param)
        var param = param.split(" ");
        console.log(param);
        var productid = parseInt(param[0]);
        var orderid = parseInt(param[1]);
        await productOrder.updateProductOrder(productid, orderid, req.body, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err);
            } else {
                abstractController.sendData(res, data)
            }
        })
    }
    /**
     * Thêm sản phẩm vào giỏ hàng với người dùng đã đăng nhập
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.addProductOrderWithUserID = async(req, res, param) => {
    var product = req.body;
    var userid = param;
    var orderid = 0;
    // console.log(product)
    // console.log(userid)
    // kiểm tra userid này có orderid chưa
    await Session.getOrderByUserID(userid, async(err, data) => {
            if (err) {
                // console.log(err)
            } else {
                // console.log(data)

                //nếu có order và transaction=0 (chưa mua hàng)
                if (data.length > 0) {
                    var orderid = data[0].OrderID
                    var productorder = {
                        Amount: product.Amount,
                        ProductID: product.ProductID,
                        OrderID: orderid
                    }
                    await productOrder.addProductOrder(productorder, (err, data) => {
                        if (err) {
                            abstractController.sendErr(res, err);
                        } else {
                            abstractController.sendData(res, data)
                        }
                    })
                }
                //nếu chưa có orderid hoặc transaction=1 (đơn hàng đã được mua)
                else {
                    // tạo một order mới
                    await order.addOrder({}, async(err, data) => {
                        if (err) {

                        } else {
                            //lấu order đã tạo và cập nhật lại session
                            var orderid_new = data.insertId;
                            var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
                            await Session.updateSession(sessionid, { OrderID: orderid_new, UserID: userid }, async(err, data) => {
                                if (err) {

                                } else {
                                    // thêm product vào order mới
                                    var productorder = {
                                        Amount: product.Amount,
                                        ProductID: product.ProductID,
                                        OrderID: orderid_new
                                    }
                                    await productOrder.addProductOrder(productorder, (err, data) => {
                                        if (err) {
                                            abstractController.sendErr(res, err);
                                        } else {
                                            abstractController.sendData(res, data)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }

            }
        })
        //nếu chưa có orderid hay có orderid nhưng Transaction!=0 thì thêm orderid và cập nhật vào session

    //nếu có rồi thì lấy orderid với TransactionID=0 và cập nhật vào 
}
exports.getProductOrderByUserID = async(req, res, param) => {
        var userid = param;
        await Session.getOrderByUserID(userid, async(err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data.length > 0) {
                    var orderid = data[0].OrderID;
                    console.log(orderid)
                    await productOrder.getProductByOrderID(orderid, async(err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data)
                            abstractController.sendData(res, data);
                        }
                    })
                }
            }
        })
    }
    /**
     * Lấy thông tin giở hàng theo session
     */
exports.getProductBySession = async(req, res, param) => {
    var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
    //kiếm tra session đã có order chưa
    await Session.getSessionByID(sessionid, async(err_ss, data_ss) => {
        if (err_ss) {

        } else {
            if (data_ss.length > 0) {
                var session = new Session(data_ss[0]);
                //kiểm tra session đã có order chưa
                if (session.OrderID != 0) {
                    //kiểm tra order đã được giao dịch chưa

                    await productOrder.getProductByOrderID(session.OrderID, async(err_po, data_po) => {
                        if (err_po) {

                        } else {
                            abstractController.sendData(data_po);
                        }
                    })
                } else {
                    abstractController.sendData(res, [])
                }
            }
        }
    })
}