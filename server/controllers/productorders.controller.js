const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
const abstractController = require('./abstract.controller')
const Product = require("../models/product.model.js")
const Session = require("../models/session.model.js")
const auth = require('./auth.controller')
const productOrder = require('../models/productorder.model')
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
exports.addProductOrderWithUserID = async(req, res, param) => {
    var userid = param;
    // kiểm tra userid này có orderid chưa

    //nếu chưa có orderid hay có orderid nhưng Transaction!=0 thì thêm orderid và cập nhật vào session

    //nếu có rồi thì lấy orderid với TransactionID=0 và cập nhật vào 
}