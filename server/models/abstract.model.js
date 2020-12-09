const sql = require('../db.js')
exports.queryExc = async(result, sqlStatement, param) => {
    await sql.query(sqlStatement, param, (err, data) => {
        if (err)
            console.log("sql error: ", err);
        else {
            result(null, data);
        }
    })
}