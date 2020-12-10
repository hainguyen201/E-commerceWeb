const db = require("../db.js")
const headers = require('../config/header.config')
const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
const abstractController = require('./abstract.controller')
const fs = require('fs')
    /**
     * Tìm kiếm sản phẩm theo danh mục
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findProductByCatalogID = (req, res, param) => {
        Products.getProductByCatalogs(param, (err, data) => {
            if (err) {
                abstractController.sendErr(res, err)
            } else {
                var dt = abstractController.dataForGet;
                if (data) {
                    dt.data = this.productsFormatToClient(data)
                    dt.success = true;
                    dt.message = "Lấy dữ liệu thành công"
                }
                abstractController.sendData(res, dt)
            }
        })
    }
    /**
     * Tìm kiếm sản phẩm theo id
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findProductByID = (req, res, param) => {
    Products.getProductByID(param, (err, data) => {
        if (err)
            abstractController.sendErr(res, err)
        else {
            var dt = abstractController.dataForGet;
            if (data) {
                dt.data = this.productsFormatToClient(data)
                dt.success = true;
                dt.message = "Lấy dữ liệu thành công"
            }
            abstractController.sendData(res, dt)
        }
    })
}
exports.findAllProducts = async(req, res, param) => {
    await Products.getAllProducts((err, data) => {
        this.resultHandler(err, data, res, req)
    })
}
exports.addProduct = async(req, res, param) => {
    // var base64Data = req.body.ImageLink.replace(/^data:image\/png;base64,/, "");
    // fs.writeFile("out.png", base64Data, 'base64', function(err) {
    //     console.log(err);
    // });

    await Products.addProduct(req.body, (err, data) => {
        this.resultHandler(err, data, res, req);
    })
}
exports.productsFormatToClient = function(data) {
    if (data.length > 0)
        data.forEach(element => {
            element.ImageLink = helper.base64_encode(element.ImageLink);
        });
    return data;
}
exports.resultHandler = (err, data, res, req) => {
    if (err) {
        abstractController.sendErr(res, err)
    } else {
        var dt = abstractController.dataForGet;
        if (data) {
            dt.data = this.productsFormatToClient(data)
            dt.success = true;
            dt.message = "Lấy dữ liệu thành công"
        }
        abstractController.sendData(res, dt)
    }
}