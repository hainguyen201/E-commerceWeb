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
User.updateUser = (userId, user, result) => {
    var date = new Date();
    var userUpdate = user;
    userUpdate.Name = user.Name ? user.Name : "";
    userUpdate.Email = user.Email ? user.Email : "";
    userUpdate.Phone = user.Phone ? user.Phone : "";
    userUpdate.Address = user.Address ? user.Address : "";
    userUpdate.Password = user.Password ? user.Password : "";
    userUpdate.UserName = user.UserName ? user.UserName : "";
    sqlString = `UPDATE user SET 
    Name = ${userUpdate.Name}, 
    Email = ${userUpdate.Email}, 
    Phone = ${userUpdate.Phone}, 
    Address = ${userUpdate.Address}, 
    Password = ${userUpdate.Password}, 
    UserName = ${userUpdate.UserName}, 
    ModifiedDate=${date}
    WHERE UserID = ${userId});`
    AbstractModel.queryExc(result, sqlString);
}
module.exports = User