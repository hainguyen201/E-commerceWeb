const sql = require("../db.js");
const { forEach } = require("../route/routes.js");
const AbstractModel = require('./abstract.model')
const helper = require('../utils/helper')

const User = function(user) {
        // this.UserID = user.UserID ? user.UserID : " ";
        this.FullName = user.FullName ? user.FullName : "";
        this.Email = user.Email ? user.Email : "";
        this.Phone = user.Phone ? user.Phone : "";
        this.Address = user.Address ? user.Address : "";
        this.Password = user.Password ? user.Password : "";
        this.UserName = user.UserName ? user.UserName : "";
        // this.Role = user.Role ? user.Role : 0;
        this.UserCreatedDate = user.UserCreatedDate ? user.UserCreatedDate : helper.getDateNow();
        this.UserModifiedDate = user.UserModifiedDate ? user.UserModifiedDate : helper.getDateNow();
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
        await AbstractModel.updateDataQuery('users', userUpdate, result, 'UserId', userId)
    }
    /**
     * Tìm kiếm User theo Username
     * @param {*} body 
     * @param {*} result 
     */
User.findByUserName = async(body, result) => {
        sqlString = `select * from users where username = ? and password=?`
        await AbstractModel.queryExc(result, sqlString, [body.UserName, body.Password]);
    }
    /**
     * Thêm User
     * @param {*} user 
     * @param {*} result 
     */
User.addUser = async(user, result) => {
    var userAdd = new User(user)
    await AbstractModel.addDataQuery('users', userAdd, result);
}
User.deleteUser = async(userId, result) => {
    var sqlString = `delete from users where UserID=${userId}`
    await AbstractModel.queryExc(result, sqlString)
}
module.exports = User