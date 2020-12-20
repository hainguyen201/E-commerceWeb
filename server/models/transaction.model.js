const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')
const Transaction = function(transaction) {
    this.Payment = transaction.Payment ? transaction.Payment : 0;
    this.DeliveryAddress = transaction.DeliveryAddress ? transaction.DeliveryAddress : '';
    this.Message = transaction.Message ? transaction.Message : 0;
    this.UserID = transaction.UserID ? transaction.UserID : 0;
    this.SessionID = transaction.SessionID ? transaction.SessionID : 0;
}
Transaction.getTransactionByUserID = async(userid, result) => {
    userid = parseInt(userid)
    var sqlString = `select * from transactions where UserID=?`;
    await AbstractModel.queryExc(result, sqlString, [userid]);
}
Transaction.getTransactionBySessionID = async(sessionid, result) => {
    var sqlString = `select * from transactions where SessionID =?`
    await AbstractModel.queryExc(result, sqlString, [sessionid])
}
Transaction.addTransaction = async(transaction, result) => {
    var transaction = new Transaction(transaction);
    transaction.TransactionCreatedDate = helper.getDateNow();
    await AbstractModel.addDataQuery('transactions', transaction, result);

}
Transaction.updateTransactionByID = async(transactionid, transaction, result) => {
    transaction = new Transaction(transaction);
    transaction.TransactionModifiedDate = helper.getDateNow();
}