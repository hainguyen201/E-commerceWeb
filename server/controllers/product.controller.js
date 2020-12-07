const db = require("../db.js")
const headers = require('../config/header.config')
const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
const abstractController = require('./abstract.controller')
    /**
     * Lấy toàn bộ danh sách sản phẩm
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findAll = (req, res, param) => {
        console.log(res)
        Products.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving products."
                })
            else {
                data.forEach(element => {
                    element.ImageLink = helper.base64_encode(element.ImageLink);
                });
                abstractController.sendData(res, data);
            }
        })
    }
    /**
     * Tìm kiếm sản phẩm theo ID
     * @param {*} req 
     * @param {*} res 
     * @param {*} param 
     */
exports.findProductByCatalogID = (req, res, param) => {
    console.log("param", res)
}