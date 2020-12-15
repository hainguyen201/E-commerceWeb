const sql = require('../db.js')
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')
const Order = function(order) {
    this.TransactionID = order.TransactionID ? order.TransactionID : 0;
    this.Status = order.Status ? order.Status : 0;
    this.OrderCreatedDate = order.OrderCreatedDate ? order.OrderCreatedDate : helper.getDateNow();
    this.OrderModifiedDate = order.OrderModifiedDate ? order.OrderModifiedDate : helper.getDateNow();
}
Order.getOrderByID = async(orderid, result) => {
    sqlString = `select  * from orders where OrderID=${orderid}`;
    await AbstractModel.queryExc(result, sqlString, [orderid]);
}
Order.getAllOrder = async(result) => {
    sqlString = "select * from orders";
    await AbstractModel.queryExc(result, sqlString);
}
Order.updateOrder = async(orderID, order, result) => {
    var order_update = new Order(order)
    delete order_update.OrderCreatedDate;
    await AbstractModel.updateDataQuery('orders', order_update, result, 'OrderID', orderID);
}
Order.addOrder = async(order, result) => {
    var order_add = new Order(order);
    await AbstractModel.addDataQuery('orders', order_add, result);
}
Order.deleteOrder = async(orderId, result) => {
    var sqlString = `delete from orders where OrderID=?`
    await AbstractModel.queryExc(result, sqlString, [orderId])
}
module.exports = Order