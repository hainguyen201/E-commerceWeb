const sql = require("../db.js");
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')
const uuid = require('uuid')
const Session = function(session) {
    this.OrderID = session.OrderID ? session.OrderID : 0;
    this.UserID = session.UserID ? session.UserID : 0;
}
Session.getSessionByID = async(sessionId, result) => {
    var sqlString = `select * from sessions where SessionID=?`;
    AbstractModel.queryExc(result, sqlString, [sessionId])
}
Session.getOrderByUserID = async(userid, result) => {
    var sqlString = `select distinct o.OrderID from sessions as s, orders as o where UserId=${userid} and s.OrderID=o.OrderID and TransactionID=0`;
    await AbstractModel.queryExc(result, sqlString);
}
Session.addSession = async(session, result) => {
    var add_ss = new Session(session);
    add_ss.SessionID = session.SessionID;
    if (session.UserId) {
        // không thêm orderID
        AbstractModel.addDataQuery('sessions', add_ss, result);
    } else {
        // thêm session
        AbstractModel.addDataQuery('sessions', add_ss, result)
    }
}
Session.updateSession = async(sessionId, session, result) => {
    var update_ss = new Session(session);
    AbstractModel.updateDataQuery('sessions', update_ss, result, 'SessionID', sessionId);
}
module.exports = Session