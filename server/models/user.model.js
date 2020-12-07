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
    /**
     * Lấy danh sách User
     * @param {*} result 
     */
User.getAll = result => {
        sqlString = 'select * from user';
        AbstractModel.queryExc(result, sqlString)
    }
    /**
     * Tìm kiếm User theo ID
     * @param {*} userId 
     * @param {*} result 
     */
User.findById = (userId, result) => {
        sqlString = `select * from user where userid = ?`
        AbstractModel.queryExc(result, sqlString, [userId]);
    }
    /**
     * Cập nhật User
     * @param {*} userId 
     * @param {*} user 
     * @param {*} result 
     */
User.updateUser = (userId, user, result) => {
        var now = new Date('');
        var date = now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
        var userUpdate = formatUser(user);
        sqlString = "UPDATE user SET ";
        sqlString += `Name =?, `;
        sqlString += `Email =?, `;
        sqlString += `Phone =?, `;
        sqlString += `Password =?, `;
        sqlString += `Address =?,  `;
        sqlString += `ModifiedDate=?`
        sqlString += ` WHERE UserId = ?`;
        var userU = [];
        userU.push(userUpdate.Name);
        userU.push(userUpdate.Email);
        userU.push(userUpdate.Phone);
        userU.push(userUpdate.Password);
        userU.push(userUpdate.Address);
        userU.push(date);
        userU.push(userId);
        //console.log(sqlString)
        //AbstractModel.queryExc(result, sqlString);
    }
    /**
     * Tìm kiếm User theo Username
     * @param {*} body 
     * @param {*} result 
     */
User.findByUserName = async(body, result) => {
        sqlString = `select * from user where username = "${body.UserName}" && password="${body.Password}"`
        await AbstractModel.queryExc(result, sqlString);
    }
    /**
     * Thêm User
     * @param {*} user 
     * @param {*} result 
     */
User.addUser = (user, result) => {
        sqlString = "insert into User(Name, Email, Phone, Address, UserName, Password) values (?,?,?,?,?,?)";
        userAdd = formatUser(user);
        var usera = [];
        usera.push(userAdd.Name);
        usera.push(userAdd.Email);
        usera.push(userAdd.Phone);
        usera.push(userAdd.Address);
        usera.push(userAdd.UserName);
        usera.push(userAdd.Password);
        //console.log(sqlString);
        AbstractModel.queryExc(result, sqlString, usera);
    }
    /**
     * format user với các trường hợp null
     * @param {*} user 
     */
function formatUser(user) {
    userUpdate = user;
    userUpdate.Name = user.Name ? user.Name : " ";
    userUpdate.Email = user.Email ? user.Email : " ";
    userUpdate.Phone = user.Phone ? user.Phone : " ";
    userUpdate.Address = user.Address ? user.Address : " ";
    userUpdate.Password = user.Password ? user.Password : " ";
    userUpdate.UserName = user.UserName ? user.UserName : " ";
    return user;
}
module.exports = User