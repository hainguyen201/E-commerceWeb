const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper');
const Product = require('./product.model.js');
const ProductOrder = function(product_order) {
    this.Amount = product_order.Amount ? product_order.Amount : 0;
    this.ProductOrderModifiedDate = product_order.ProductOrderModifiedDate ? product_order.ProductOrderModifiedDate : helper.getDateNow();
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
    p.ProductModifiedDate,
    po.Amount
    FROM productorders as po, products as p where po.ProductID=p.ProductID and OrderID=?;`
    orderid = parseInt(orderid)
    await AbstractModel.queryExc(result, sqlString, [orderid]);
}
ProductOrder.addProductOrder = async(productorder, result) => {
    var product_order_add = new ProductOrder(productorder);
    product_order_add.ProductID = productorder.ProductID;
    product_order_add.OrderID = productorder.OrderID;
    product_order_add.ProductOrderCreatedDate = helper.getDateNow();
    await AbstractModel.addDataQuery('productorders', product_order_add, result);
}
ProductOrder.updateProductOrder = async(productid, orderid, productorder, result) => {
    var product_order_update = new ProductOrder(productorder);
    await AbstractModel.updateDataQuerys('productorders', product_order_update, result, ['ProductID', 'OrderID'], [productid, orderid]);
}
ProductOrder.deleteProductOrder = async(orderID, productID, result) => {
    var sqlString = `delete from productorders where ProductID=? and OrderID= ?`;
    await AbstractModel.queryExc(result, sqlString, [productID, orderID]);
}
ProductOrder.getPriceByOrderID = async(orderid, result) => {
    var sqlString = `select sum(Price*Amount) as Payment from productorders as po, products as p where OrderId=${parseInt(orderid)} and po.ProductID=p.ProductID`
    await AbstractModel.queryExc(result, sqlString);
}
module.exports = ProductOrder