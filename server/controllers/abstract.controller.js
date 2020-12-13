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
    console.log("this is data", data)
        // res.statusCode = 200;
    res.statusCode = 200;
    res.write(JSON.stringify(data))
        //console.log(res)
    res.end()
}
exports.sendErr = (res, err) => {
    res.statusCode = err.statusCode|| 500;
    res.write(JSON.stringify(err))
    res.end()
}
exports.dataForGet = {
    data: [],
    success: false,
    message: "Lấy dữ liệu không thành công"
}