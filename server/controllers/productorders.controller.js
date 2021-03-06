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
const Order = require('../models/order.model')
const ProductOrder = require('../models/productorder.model')
    /**
     * Lấy sản phẩm bởi orderID
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
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

/**
 * Format data product
 * @param {*} data 
 */

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

/**
 * Cập nhật product order
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.updateProductOrderByOrderIDProductID = async(req, res, param) => {
        var param = param.split(" ");
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

/**
 * Lấy product order qua id user
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.getProductOrderByUserID = async(req, res, param) => {
        var userid = param;
        debugger
        await Session.getOrderByUserID(userid, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err)
            } else {
                if (data.length > 0) {
                    var orderid = data[0].OrderID;
                    console.log(orderid)
                    await productOrder.getProductByOrderID(orderid, async(err, data) => {
                        if (err) {
                            abstractController.sendErr(res, err)
                        } else {
                            console.log(data)
                            data = this.productsFormatToClient(data)
                            abstractController.sendData(res, data);
                        }
                    })
                } else {
                    abstractController.sendData(res, [])
                }
            }
        })
    }
    /**
     * Lấy thông tin giở hàng theo session
     */
exports.getProductOrderBySession = async(req, res, param) => {
        var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
        //kiếm tra session đã có order chưa
        await Session.getSessionByID(sessionid, async(err_ss, data_ss) => {
            if (err_ss) {

            } else {
                if (data_ss.length > 0) {
                    var session = new Session(data_ss[0]);
                    //kiểm tra session đã có order chưa
                    if (session.OrderID != 0) {
                        await productOrder.getProductByOrderID(session.OrderID, async(err_po, data_po) => {
                            if (err_po) {

                            } else {
                                data_po = this.productsFormatToClient(data_po);
                                abstractController.sendData(res, data_po);
                            }
                        })
                    } else {

                        abstractController.sendData(res, { message: 'k có dữ liệu' })
                    }
                } else {
                    abstractController.sendData(res, [])
                }
            }
        })
    }
    /**
     * Thêm sản phẩm vào giỏ hàng khi chưa đăng nhập ( sử dụng session)
     */
exports.addProductOrderWithSession = async(req, res, param) => {
        var product_add = req.body;
        var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
        await Session.getSessionByID(sessionid, async(err_ss, data_ss) => {
            if (err_ss) {
                abstractController.sendErr(res, err);
            } else {
                var orderid = data_ss[0].OrderID;
                if (orderid == 0) {
                    await Order.addOrder({}, async(err_o, data_o) => {
                        if (err_o) {
                            abstractController.sendErr(res, err_o)
                        } else {
                            var orderid_new = data_o.insertId;
                            product_add.OrderID = orderid_new;
                            await Session.updateSession(sessionid, { OrderID: orderid_new }, async(err_s, data_s) => {
                                if (err_s) {
                                    abstractController.sendErr(res, err_s);
                                } else {
                                    await productOrder.addProductOrder(product_add, async(err_po, data_po) => {
                                        if (err_po) {
                                            abstractController.sendErr(res, err_po);
                                        } else {
                                            abstractController.sendData(res, data_po)
                                        }
                                    })
                                }
                            })

                        }
                    })
                } else {
                    product_add.OrderID = orderid;
                    await productOrder.addProductOrder(product_add, async(err_po, data_po) => {
                        if (err_po) {
                            abstractController.sendErr(res, err_po);
                        } else {
                            abstractController.sendData(res, data_po)
                        }
                    })
                }

            }
        })
    }
    /**
     * Cập nhật giỏ hàng đối với user đã đăng nhập
     */
exports.updateProductOrderWithUserID = async(req, res, param) => {
        var product = req.body;
        var userid = param;
        var orderid = 0;
        // console.log(product)
        // console.log(userid)
        // kiểm tra userid này có orderid chưa
        await Session.getOrderByUserID(userid, async(err_ss, data_ss) => {
            if (err_ss) {
                abstractController.sendData(res, err_ss)
            } else {
                // console.log(data)

                //nếu có order và transaction=0 (chưa mua hàng)
                if (data_ss.length > 0) {
                    var orderid = data_ss[0].OrderID
                    var productorder = {
                        Amount: product.Amount
                    }
                    await productOrder.updateProductOrder(product.ProductID, orderid, productorder, (err, data) => {
                        if (err) {
                            abstractController.sendErr(res, err);
                        } else {
                            abstractController.sendData(res, data)
                        }
                    })
                } else {
                    abstractController.sendErr(res, { message: 'không tồn tại giỏ hàng' })
                }

            }
        })
    }
    /**
     * Cập nhật giỏ hàng đối với user chưa đăng nhập (sử dụng session)
     * 
     */
exports.updateProductOrderWithSession = async(req, res, param) => {
        var product = req.body;
        var sessionid = helper.cookieparser(req.headers.cookie).sessionid;
        await Session.getSessionByID(sessionid, async(err_ss, data_ss) => {
            if (err_ss) {
                abstractController.sendErr(res, err);
            } else {
                var orderid = data_ss[0].OrderID;
                await productOrder.updateProductOrder(product.ProductID, orderid, { Amount: product.Amount }, async(err_po, data_po) => {
                    if (err_po) {
                        abstractController.sendErr(res, err_po);
                    } else {
                        abstractController.sendData(res, data_po)
                    }
                })
            }

        })
    }
    /**
     * Xóa sản phẩm trong giỏ hàng với user đã đăng ký
     */
exports.deleteProductOrderWithUserID = async(req, res, param) => {
    param = param.split(" ");
    var userid = param[1];
    var productid = param[0];
    console.log(param)
        // để xóa được thì trc đó phải có sản phẩm
        //lấy thông tin orderid từ session thông qua userid
    await Session.getOrderByUserID(userid, async(err_ss, data_ss) => {
        if (err_ss) {
            abstractController.sendData(res, err_ss)
        } else {
            //nếu có order và transaction=0 (chưa mua hàng)
            if (data_ss.length > 0) {
                var orderid = data_ss[0].OrderID
                await productOrder.deleteProductOrder(orderid, productid, (err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err);
                    } else {
                        abstractController.sendData(res, data)
                    }
                })
            } else {
                abstractController.sendErr(res, { message: 'Không tồn tại' })
            }

        }
    })
}

/**
 * Xóa giỏ hàng
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.deleteProductOrderWithSession = async(req, res, param) => {
    var productid = param
    var sessionid = helper.cookieparser(req.headers.cookie).sessionid;

    await Session.getSessionByID(sessionid, async(err_ss, data_ss) => {
        if (err_ss) {
            abstractController.sendErr(res, err);
        } else {
            if (data_ss.length > 0) {
                var orderid = data_ss[0].OrderID;
                await productOrder.deleteProductOrder(orderid, productid, async(err_po, data_po) => {
                    if (err_po) {
                        abstractController.sendErr(res, err_po);
                    } else {
                        abstractController.sendData(res, data_po)
                    }
                })
            } else {
                abstractController.sendErr(res, { message: 'Không tồn tại' })
            }

        }

    })
}