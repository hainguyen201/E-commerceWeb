const db = require("../db.js")
const headers = require('../config/header.config')
const Products = require('../models/product.model.js')
const helper = require('../utils/helper')
const path = require('path')
exports.findAll = (req, res, param) => {
    Products.getAll((err, data) => {
        console.log('data', data)
        console.log('err', err)
        console.log("check")
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            })
        else {
            data.forEach(element => {
                element.ImageLink = helper.base64_encode(element.ImageLink);
                console.log(element.ImageLink)
            });
            res.writeHead(200, headers)
            res.write(JSON.stringify(data))
            res.end()
        }
    })
}