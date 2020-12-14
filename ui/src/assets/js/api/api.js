class CustomError extends Error {
    constructor(statusCode, message, info) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.type = 'customError';
        this.statusCode = statusCode;
        this.info = info;
    }
};

const PREFIX = "https://localhost:3000";
class Api {
    constructor() {
        this.xhrGet = new XMLHttpRequest();
        this.xhrPost = new XMLHttpRequest();
    }

    defaultHeaderConfig() {
        this.xhrPost.setRequestHeader('Content-Type', 'application/json');
        // this.xhrPost.setRequestHeader('Access-Control-Allow-Origin', '*');
    }

    customHeaderConfig(header = []) {
        //this.xhr.setRequestHeader();
    }

    get(path = '') {
        return new Promise((resolve, reject) => {
            let xhr = this.xhrPost;
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });

                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //statuscode khong phai 2xx
                    reject(new CustomError(xhr.status, "hello"));
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                reject(new CustomError(500, "Unknow error!"));
            }
            xhr.open('GET', PREFIX + path, true);
            xhr.withCredentials = true
            xhr.send();
        });
    }

    post(path = '', data) {
        return new Promise((resolve, reject) => {
            let xhr = this.xhrPost;
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //statuscode khong phai 2xx

                    reject(new CustomError(xhr.status, "hello"));
                }
            };
            xhr.onerror = () => {

                //loi mang hoac may chu
                reject(new CustomError(500, "Unknow error!"));
            };
            xhr.onabort = () => {
                debugger
            }
            xhr.open('POST', PREFIX + path, true);
            xhr.withCredentials = true
            this.defaultHeaderConfig();
            xhr.send(JSON.stringify(data));
        });
    }
    getAllResponseHeaders() {
        return this.xhr.getAllResponseHeaders();
    }

}
var api = new Api();
// export default new Api();