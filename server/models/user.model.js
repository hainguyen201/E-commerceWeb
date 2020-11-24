const sql = require("../db.js");
const AbstractModel = require('./abstract.model')

const User = function(user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.phone = user.phone
    this.address = user.address
    this.password = user.password
    this.username = user.username
}

User.getAll = result => {
    sqlString = 'select * from user';
    AbstractModel.queryExc(result, sqlString)
}

User.findById = (userId, result) => {
    sqlString = `select * from user where userid = ${userId}`
    AbstractModel.queryExc(result, sqlString);
}

module.exports = User