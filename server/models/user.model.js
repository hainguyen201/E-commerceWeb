const sql = require("../db.js");
const AbstractModel = require('./abstract.model')

const User = function(user) {
    this.userid = user.userid
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
    var now = new Date('');
    var date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
    var userUpdate = user;
    userUpdate.Name = user.Name ? user.Name : " ";
    userUpdate.Email = user.Email ? user.Email : " ";
    userUpdate.Phone = user.Phone ? user.Phone : " ";
    userUpdate.Address = user.Address ? user.Address : " ";
    userUpdate.Password = user.Password ? user.Password : " ";
    userUpdate.UserName = user.UserName ? user.UserName : " ";
    sqlString = "UPDATE user SET ";
    sqlString += `Name ="${userUpdate.Name}", `;
    sqlString += `Email ="${userUpdate.Email}", `;
    sqlString += `Phone ="${userUpdate.Phone}", `;
    sqlString += `Password ="${userUpdate.Password}", `;
    sqlString += `Address ="${userUpdate.Address}",  `;
    sqlString += `ModifiedDate="${date}"`

    sqlString += ` WHERE UserID = ${userId}`;
    console.log(sqlString)
        //AbstractModel.queryExc(result, sqlString);

}
User.findByUserName = (body, result) => {
    sqlString = `select * from user where username = "${body.UserName}" && password="${body.Password}"`
    AbstractModel.queryExc(result, sqlString);
}
module.exports = User