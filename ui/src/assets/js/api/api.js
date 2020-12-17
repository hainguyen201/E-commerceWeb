class Api {
    constructor() {
        // this.xhrGet = new XMLHttpRequest();
        // this.xhrPost = new XMLHttpRequest();
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
            let xhr = new XMLHttpRequest();
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                debugger
                const response = JSON.parse(xhr.responseText);
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(new CustomError(xhr.status, response.message || "Unknow error on server!"));
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                reject(new CustomError(500, "Unknow error!"));
            }
            xhr.open('GET', PREFIX_URL + path, true);
            xhr.withCredentials = true;
            xhr.send();
        });
    }

    post(path = '', data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                const response = JSON.parse(xhr.responseText);
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(new CustomError(xhr.status, response.message || "Unknow error on server!"));
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                reject(new CustomError(500, "Unknow error!"));
            };
            xhr.onabort = () => {
                debugger
            }
            xhr.open('POST', PREFIX_URL + path, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = true;
            xhr.send(JSON.stringify(data));
        });
    }
    // getAllResponseHeaders() {
    //     return this.xhr.getAllResponseHeaders();
    // }

}
var api = new Api();
// export default new Api();