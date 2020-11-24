const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const Product = function(product) {
    this.productID = product.productID;
    this.name = product.name;
    this.price = product.price;
    this.content = product.content;
    this.imageLink = product.imageLink;
    this.imageList = product.imageList;
    this.catalogID = product.catalogID;
    this.discount = product.discount;
    this.remain = product.remain;
    this.created = product.created;
    this.modified = product.modified;
}
Product.getAll = result => {
    sqlString = 'select * from products';
    AbstractModel.queryExc(result, sqlString);
}
Product.getProductByCatalogs = (catalogId, result) => {
    sqlString = `select * from products as p, catalogs as c
    where p.CatalogID=c.CatalogID
    and c.CatalogID=${catalogId}`;
    AbstractModel.queryExc(result, sqlString);

}
module.exports = Product;