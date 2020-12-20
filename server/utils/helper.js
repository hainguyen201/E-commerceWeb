var fs = require('fs')
var path = require('path');
const { ppid } = require('process');
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
    var imageAsBase64 = fs.readFileSync(path.normalize(basepath + filepath), 'base64', (err) => {
        return "";
    });
    return imageAsBase64;
}
module.exports.save_base64 = (image, name) => {
    // var imsave = image.replace((/^data:image\/jpg;base64,/, ""));
    fs.writeFileSync(path.normalize(basepath + name), image, 'base64', (err) => {
        console.log('k luu dc file')
    })
}
module.exports.deleteImage = (name) => {
    var deletepath = path.normalize(basepath + name)
    fs.unlinkSync(deletepath, (err) => {
        console.log(err)
    })
}
module.exports.getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
                console.log("body", body)
            });

            req.on('end', () => {
                //resolve(parse(body));
                resolve(body);
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports.getDateNow = function() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() != 12 ? date.getMonth() + 1 : 1;
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}
module.exports.formatDate = function(date) {
    var datef = new Date(date)
    var day = date.getDate();
    var month = date.getMonth() != 12 ? date.getMonth() + 1 : 1;
    var year = date.getFullYear();
    return year + '-' + month + '-' + day;
}
module.exports.cookieparser = (str) => {
    str = str.split('; ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
        var cur = str[i].split('=');
        result[cur[0]] = cur[1];
    }
    var cookie = {
        sessionid: result.sessionid ? result.sessionid : null
    }
    return cookie;
}
module.exports.productsFormatToClient = function(data) {
    if (data)
        data.forEach(element => {
            if (element.Image.length > 0)
                element.Image = helper.base64_encode(element.Image);
            if (element.ProductCreatedDate)
                element.ProductCreatedDate = helper.formatDate(element.ProductCreatedDate)
            if (element.ProductModifiedDate)
                element.ProductModifiedDate = helper.formatDate(element.ProductModifiedDate)
        });
    return data;
}