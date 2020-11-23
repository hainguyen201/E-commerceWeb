const sql = require('../db.js')
exports.queryExc = (result, sqlStatement) => {
    sql.query(sqlStatement, (err, data) => {
        if (err)
            console.log(err);
        else {
            result(null, data);
        }
    })
}