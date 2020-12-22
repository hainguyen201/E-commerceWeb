const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const abstractController = require('./abstract.controller')
const fs = require('fs')
const Product = require("../models/product.model.js")
const Session = require("../models/session.model.js")
const auth = require('./auth.controller')
const { isBuffer } = require("util")
    /**
     * Tìm kiếm sản phẩm theo danh mục
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findProductByCatalogID = async(req, res, param) => {
        await Products.getProductByCatalogs(param, (err, data) => {
            if (err) {
                abstractController.sendErr(res, err)
            } else {
                var dt = abstractController.dataForGet;
                if (data) {
                    dt.data = this.productsFormatToClient(data)
                    dt.success = true;
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
exports.findProductByID = async(req, res, param) => {
    await Products.getProductByID(param, (err, data) => {
        if (err)
            abstractController.sendErr(res, err)
        else {
            var dt = abstractController.dataForGet;
            if (data.length > 0) {
                dt.data = this.productsFormatToClient(data)
                dt.success = true;

            } else {
                dt.data = data
                dt.success = true;
            }
            abstractController.sendData(res, dt)
        }
    })
}

/**
 * Tìm kiếm sản phẩm qua tên
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.findProductByName = async(req, res, param) => {
        await Product.findProductByName(param, (err, data) => {
            if (err) {
                abstractController.sendErr(res, err)
            } else {
                var dt = abstractController.dataForGet;
                if (data) {
                    dt.data = this.productsFormatToClient(data)
                    dt.success = true
                }
                abstractController.sendData(res, data)
            }
        })
    }
    /**
     * Tìm tất cả sản phẩm
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findAllProducts = async(req, res, param) => {
    await Products.getAllProducts((err, data) => {
        this.resultHandler(err, data, res, req)
    })
}

/**
 * Thêm sản phẩm với role
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.addProductWithAuth = async(req, res, param) => {
    await auth.getRole(req, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            if (data == 1) {
                this.addProduct(req, res, param)
            } else {
                abstractController.sendAuth(res);
            }
        }
    })

}

/**
 * Thêm sản phẩm
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.addProduct = async(req, res, param) => {
    var product = new Product(req.body)
    var image = product.Image
        //nếu có ảnh
    if (image.length > 0) {
        // thêm sản phẩm và k thêm ảnh
        product.Image = "";
        await Product.addProduct(product, async(err, dataadd) => {
            if (err) {
                abstractController.sendErr(res, err)
            }
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

/**
 * Cập nhật sản phẩm với role
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.updateProductWithAuth = async(req, res, param) => {
    await auth.getRole(req, async(err, data) => {
        if (err) {
            abstractController.sendErr(res, err);
        } else {
            if (data == 1) {
                this.updateProduct(req, res, param)
            } else {
                abstractController.sendAuth(res);
            }
        }
    })
}

/**
 * Cập nhật sản phẩm
 * @param {*} req 
 * @param {*} res 
 * @param {*} param 
 */
exports.updateProduct = async(req, res, param) => {
        //cập nhật ảnh mới
        await auth.getRole(req, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err);
            } else {
                if (data == 1) {
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
                } else {
                    abstractController.sendAuth(res)
                }
            }
        })

    }
    /**
     * Xóa sản phẩm
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.deleteProduct = async(req, res, param) => {
        var productid = param;
        await Product.DeleteProduct(productid, async(err_p, data_p) => {
            if (err_p) {
                abstractController.sendErr(res, err);
            } else {
                //xóa ảnh trong storage
                var imagepath = productid + '.jpg'
                helper.deleteImage(imagepath)
                abstractController.sendData(res, data_p);
            }
        })
    }
    /**
     * Xóa sản phẩm với role
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.deleteProductWithAuth = async(req, res, param) => {
        await auth.getRole(req, async(err, data) => {
            if (err) {
                abstractController.sendErr(res, err);
            } else {
                if (data == 1) {
                    this.deleteProduct(req, res, param)
                } else {
                    abstractController.sendAuth(res);
                }
            }
        })
    }
    /**
     * Format product
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
 * Format sản phẩm
 * @param {*} data 
 */
exports.productsFormatToServer = function(data) {
    if (data.length > 0) {
        data.forEach(element => {
            if (element.Image)
                element.Image = data.ProductID + '.jpg'
        });
    }
}

/**
 * Xử lí kết quả
 * @param {*} err 
 * @param {*} data 
 * @param {*} res 
 * @param {*} req 
 */
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