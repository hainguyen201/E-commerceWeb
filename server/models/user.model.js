
const sql = require("../db.js");


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
    sql.query("SELECT * FROM user", (err, r)=>{
        if (err) {
            console.log("error: ", err)
            result(null, err)
            return
        }
        console.log("customers: ", r)
        result(null, r)
    })
}

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE userid = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ error: "not_found" }, null);
    })
}

module.exports = User