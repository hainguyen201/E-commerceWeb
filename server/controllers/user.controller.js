const { USER } = require('../config/db.config')
const User = require('../models/user.model')
const headers = require('../config/header.config')

exports.findAll = (req, res, param) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            })
        else {
            res.writeHead(200, headers)
            res.write(JSON.stringify(data))
            res.end()
        }
    })
}

exports.findOne = (req, res, param) => {
    User.findById(param, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {

            } else {

            }
        } else {
            res.writeHead(200, headers)
            res.write(JSON.stringify(data))
            res.end()
        }
    })
}