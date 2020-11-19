const sql = require('../db.js')
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
    this.created
}