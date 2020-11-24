const headers = require('../config/header.config')
    /**
     * Gửi dữ liệu cho client
     * @param {*} res 
     * @param {*} data 
     */
exports.sendData = (res, data) => {
    res.writeHead(200, headers)
    res.write(JSON.stringify(data))
    res.end()
}