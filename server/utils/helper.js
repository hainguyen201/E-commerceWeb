var fs = require('fs')
var path = require('path')
module.exports.validationError = (res, error = 'Data provided is not valid') => {
    addHeaders(res);

    res.statusCode = 422;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

module.exports.error = (res, error = 'An unknown error occurred', statusCode = 500) => {
    addHeaders(res);

    res.statusCode = statusCode;

    res.end(JSON.stringify({
        status: 'fail',
        error
    }, null, 3));
};

module.exports.success = (res, data = null) => {
    addHeaders(res);

    res.statusCode = 200;

    res.end(JSON.stringify({
        status: 'success',
        data
    }, null, 3));
};

const addHeaders = (res) => {
    return res.setHeader('Content-Type', 'application/json');
}
const basepath = path.normalize(__dirname + '/../storage/image/');
module.exports.base64_encode = (filepath) => {
    var imageAsBase64 = fs.readFileSync(path.normalize(basepath + filepath), 'base64');
    return imageAsBase64;
}