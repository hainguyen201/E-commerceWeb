const sql = require('../db.js')
const AbstractModel = function() {

}
AbstractModel.addDataQuery = async function(tablename, data, result) {
    var dataAdd = [];
    var keys = Object.keys(data)
    var sqlString = `insert into ${tablename}(`;
    keys.forEach(key => {
        sqlString += key + ',';
    })
    sqlString = sqlString.slice(0, -1);
    sqlString += ') values (';
    keys.forEach(key => {
        sqlString += "?,"
        dataAdd.push(data[key])
    })
    sqlString = sqlString.slice(0, -1);
    sqlString += ')';
    await this.queryExc(result, sqlString, dataAdd);
}
AbstractModel.queryExc = async(result, sqlStatement, param) => {
    await sql.query(sqlStatement, param, (err, data) => {
        if (err) {
            result(err, [])
        } else {
            result(null, data);
        }
    })
}
AbstractModel.updateDataQuery = async function(tablename, data, result, idname, id) {
    var dataUpdate = [];
    var keys = Object.keys(data)
    var sqlString = `update ${tablename} set `;
    keys.forEach(key => {
        sqlString += key + '=?,';
    })
    sqlString = sqlString.slice(0, -1)
    sqlString += ` WHERE ${idname} = ${id}`;
    keys.forEach(key => {
        dataUpdate.push(data[key])
    })
    await AbstractModel.queryExc(result, sqlString, dataUpdate);
}
module.exports = AbstractModel