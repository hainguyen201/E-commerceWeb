const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper');
const Product = require('./product.model.js');
const ProductOrder = function(product_order) {
    this.Amount = product_order.Amount ? product_order.Amount : 0;
    this.ProductOrderModifiedDate = product_order.ProductOrderModifiedDate ? product_order.ProductOrderModifiedDate : helper.getDateNow();
    this.OrderID = product_order.OrderID ? product_order.OrderID : 0;
}
ProductOrder.getProductByOrderID = async(orderid, result) => {
    var sqlString = `SELECT p.ProductID, 
    p.Content, 
    p.CatalogID, 
    p.Image, 
    p.ImageList, 
    p.Remain, 
    p.Discount, 
    p.Price, 
    p.ProductName, 
    p.ProductCreatedDate, 
    p.ProductModifiedDate 
    FROM productorders as po, products as p where po.ProductID=p.ProductID and OrderID=?;`
    await AbstractModel.queryExc(result, sqlString, [orderid]);
}
ProductOrder.addProductOrder = async(productorder, result) => {
    var product_order_add = new ProductOrder(productorder);
    await AbstractModel.addDataQuery('productorders', product_order_add, result);
}
ProductOrder.updateProductOrder = async(productorder, result) => {
    var product_order_update = new ProductOrder(productorder)
    await AbstractModel.updateDataQuery('productorders', product_order_update, result);
}
ProductOrder.deleteProductOrder = async(orderID, productID, result) => {
    var sqlString = `delete from productorders where ProductID=? and OrderID= ?`;
    await AbstractModel.queryExc(result, sqlString, [productID, orderID]);
}
module.exports = ProductOrder