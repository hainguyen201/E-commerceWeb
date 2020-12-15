const Catalog = require('../models/catalog.model')
const abstractController = require('./abstract.controller')
const helper = require('../utils/helper')
exports.getCatalogByID = async(req, res, param) => {
    await Catalog.getCatalogById(param, (err, data) => {
        this.resultHandler(err, data, req, res)
    })
}
exports.getAllCatalog = async(req, res, param) => {
    await Catalog.getAllCatalog((err, data) => {
        this.resultHandler(err, data, req, res)
    })
}
exports.updateCatalog = async(req, res, param) => {
    await Catalog.updateCatalog(param, req.body, (err, data) => {
        this.resultHandler(err, data, req, res)
    })
}
exports.addCatalog = async(req, res, param) => {
    await Catalog.addCatalog(req.body, (err, data) => {
        this.resultHandler(err, data, req, res)
    })
}
exports.deleteCatalog = async(req, res, param) => {

    await Catalog.deleteCatalog(param, (err, data) => {
        this.resultHandler(err, data, req, res)
    })
}
exports.CatalogDataFormat = (data) => {
    if (data)
        data.forEach(element => {
            if (element.CatalogCreatedDate)
                element.CatalogCreatedDate = helper.formatDate(element.CatalogCreatedDate)
            if (element.CatalogModifiedDate)
                element.CatalogModifiedDate = helper.formatDate(element.CatalogModifiedDate)
        });
    return data;
}
exports.resultHandler = async(err, data, req, res) => {
    if (err) {
        abstractController.sendErr(res, err);
    } else {
        var dt = {
            success: true
        }
        if (req.method == 'GET')
            dt.data = this.CatalogDataFormat(data);
        else {
            dt.data = data
        }
        abstractController.sendData(res, data)
    }
}