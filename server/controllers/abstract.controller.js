/**
 *Các cấu hình và hàm chung cho controller
 */

const headers = require('../config/header.config')
    /**
     * Gửi dữ liệu cho client
     * @param {*} res 
     * @param {*} data 
     */
exports.sendData = (res, data) => {
    console.log(data)
        // res.statusCode = 200;
    res.statusCode = 200;
    res.write(JSON.stringify(data))
        //console.log(res)
    res.end()
}