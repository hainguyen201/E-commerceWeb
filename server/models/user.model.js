const sql = require("../db.js");
const { forEach } = require("../route/routes.js");
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')

const User = function(user) {
        // this.UserID = user.UserID ? user.UserID : " ";
        this.Name = user.Name ? user.Name : "";
        this.Email = user.Email ? user.Email : "";
        this.Phone = user.Phone ? user.Phone : "";
        this.Address = user.Address ? user.Address : "";
        this.Password = user.Password ? user.Password : "";
        this.UserName = user.UserName ? user.UserName : "";
        this.Role = user.Role ? user.Role : 0;
        this.CreatedDate = user.CreatedDate ? user.CreatedDate : helper.getDateNow();
        this.ModifiedDate = user.ModifiedDate ? user.ModifiedDate : helper.getDateNow();
    }
    /**
     * Lấy danh sách User
     * @param {*} result 
     */
User.getAll = async(result) => {
        sqlString = 'select * from users';
        await AbstractModel.queryExc(result, sqlString)
    }
    /**
     * Tìm kiếm User theo ID
     * @param {*} userId 
     * @param {*} result 
     */
User.findById = async(userId, result) => {
        sqlString = `select * from users where userid = ?`
        await AbstractModel.queryExc(result, sqlString, [userId]);
    }
    /**
     * Cập nhật User
     * @param {*} userId 
     * @param {*} user 
     * @param {*} result 
     */
User.updateUser = async(userId, user, result) => {
        var userUpdate = new User(user)
        var keys = Object.keys(userUpdate);
        sqlString = "UPDATE users SET ";
        keys.forEach(key => {
            sqlString += key + '=?,'
        })
        sqlString = sqlString.slice(0, -1)
        sqlString += ` WHERE UserId = ${userId}`;
        var userU = [];
        keys.forEach(key => {
            userU.push(userUpdate[key])
        })
        await AbstractModel.queryExc(result, sqlString, userU);
    }
    /**
     * Tìm kiếm User theo Username
     * @param {*} body 
     * @param {*} result 
     */
User.findByUserName = async(body, result) => {
        sqlString = `select * from users where username = "${body.UserName}" and password="${body.Password}"`
        console.log(sqlString)
        await AbstractModel.queryExc(result, sqlString);
    }
    /**
     * Thêm User
     * @param {*} user 
     * @param {*} result 
     */
User.addUser = async(user, result) => {
    var userAdd = new User(user)
    var usera = [];
    var keys = Object.keys(userAdd);
    sqlString = "insert into Users(";
    keys.forEach(key => {
        sqlString += key + ',';
    })
    sqlString = sqlString.slice(0, -1);
    sqlString += ') values (?,?,?,?,?,?,?,?,?)'
    keys.forEach(key => {
        usera.push(userAdd[key])
    })
    await AbstractModel.queryExc(result, sqlString, usera);
}
User.deleteUser = async(userId, result) => {
    var sqlString = `delete from users where UserID=${userId}`
    await AbstractModel.queryExc(result, sqlString)
}
module.exports = User