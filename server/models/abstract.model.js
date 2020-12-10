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
module.exports = AbstractModel