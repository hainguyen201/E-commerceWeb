const db = require("../db.js")
const headers = require('../config/header.config')
const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
const abstractController = require('./abstract.controller')
const fs = require('fs')
const Product = require("../models/product.model.js")
const Session = require("../models/session.model.js")
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
            if (data.length > 0) {
                dt.data = this.productsFormatToClient(data)
                dt.success = true;
                dt.message = "Lấy dữ liệu thành công"
            } else {
                dt.data = data
                dt.success = true;
                dt.message = "Không tồn tại sản phẩm"
            }
            abstractController.sendData(res, dt)
        }
    })
}
exports.findProductByName = async(req, res, param) => {
    console.log(param)
    await Product.getProductByName(param, (err, data) => {
        this.resultHandler(err, data, res, req)

    })
}
exports.findAllProducts = async(req, res, param) => {
    await Products.getAllProducts((err, data) => {
        this.resultHandler(err, data, res, req)
    })
}
exports.addProduct = async(req, res, param) => {
    var product = new Product(req.body)
    var image = product.Image
        //nếu có ảnh
    if (image.length > 0) {
        // thêm sản phẩm và k thêm ảnh
        product.Image = "";
        console.log(product)
        await Product.addProduct(product, async(err, dataadd) => {
            // console.log(dataadd)
            if (dataadd.insertId) {
                product.Image = dataadd.insertId + ".jpg"
                delete product.ProductID
                helper.save_base64(image, product.Image)
                await Product.updateProduct(dataadd.insertId, product, (err, data) => {
                    if (err) {
                        abstractController.sendErr(res, err)
                    } else {
                        if (data) {
                            abstractController.sendData(res, dataadd)
                        }
                    }
                });
            }
        })
    } else
        await Product.addProduct(product, (err, data) => {
            this.resultHandler(err, data, res, req)
        })
}
exports.updateProduct = async(req, res, param) => {
    //cập nhật ảnh mới
    var product = new Product(req.body)
    var image = product.Image
    console.log(image.length)
    if (image.length > 0) {
        //cập nhật lại thông tin và không có ảnh
        product.Image = param + ".jpg";
        await Product.updateProduct(param, product, (err, data) => {
            if (err) {
                this.resultHandler(err, data, res, req)
            } else {
                //cập nhật lại ảnh
                helper.save_base64(image, product.Image)
                this.resultHandler(err, data, res, req);
            }
        })
    } else
        await Products.updateProduct(param, product, (err, data) => {
            this.resultHandler(err, data, res, req)
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
exports.productsFormatToServer = function(data) {
    if (data.length > 0) {
        data.forEach(element => {
            if (element.Image)
                element.Image = data.ProductID + '.jpg'
        });
    }
}

exports.resultHandler = (err, data, res, req) => {
    if (err) {
        abstractController.sendErr(res, err)
    } else {
        var dt = abstractController.dataForGet;
        if (data.length > 0) {
            dt.data = this.productsFormatToClient(data)
            dt.success = true;
            dt.message = "Thành công"
        } else {
            dt.data = data
            dt.success = true;
            dt.message = "Thành công"
        }
        abstractController.sendData(res, dt)
    }
}