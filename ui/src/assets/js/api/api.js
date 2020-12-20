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
                const response = isJsonString(xhr.responseText)
                    ? JSON.parse(xhr.responseText)
                    : {};
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else if (parseInt(xhr.status) == 401) {
                    logoutSuccessful();
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(
                        new CustomError(
                            xhr.status,
                            response.message || 'Unknow error on server!',
                        ),
                    );
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                console.log('get onerror');
                reject(new CustomError(500, 'Unknow error!'));
            };
            xhr.onabort = () => {
                console.log('get onabort');
                debugger;
            };
            xhr.onloadend = () => {
                console.log('onloadend');
            };
            xhr.ontimeout = () => {
                console.log('ontimeout');
            };
            xhr.onprogress = () => {
                console.log('onprogress');
            };
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
                const response = isJsonString(xhr.responseText)
                    ? JSON.parse(xhr.responseText)
                    : {};
                debugger;
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else if (parseInt(xhr.status) == 401) {
                    logoutSuccessful();
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(
                        new CustomError(
                            xhr.status,
                            response.message || 'Unknow error on server!',
                        ),
                    );
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                console.log('post onerror');
                reject(new CustomError(500, 'Unknow error!'));
            };
            xhr.onabort = () => {
                console.log('post onabort');
                debugger;
            };
            xhr.onloadend = () => {
                console.log('onloadend');
            };
            xhr.ontimeout = () => {
                console.log('ontimeout');
            };
            xhr.onprogress = () => {
                console.log('onprogress');
            };
            xhr.open('POST', PREFIX_URL + path, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.withCredentials = true;
            xhr.send(JSON.stringify(data));
        });
    }

    put(path = '', data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                const response = isJsonString(xhr.responseText)
                    ? JSON.parse(xhr.responseText)
                    : {};
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else if (parseInt(xhr.status) == 401) {
                    logoutSuccessful();
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(
                        new CustomError(
                            xhr.status,
                            response.message || 'Unknow error on server!',
                        ),
                    );
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                console.log('put onerror');
                reject(new CustomError(500, 'Unknow error!'));
            };
            xhr.onabort = () => {
                console.log('put onabort');
                debugger;
            };
            xhr.onloadend = () => {
                console.log('onloadend');
            };
            xhr.ontimeout = () => {
                console.log('ontimeout');
            };
            xhr.onprogress = () => {
                console.log('onprogress');
            };
            xhr.open('PUT', PREFIX_URL + path, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.withCredentials = true;
            xhr.send(JSON.stringify(data));
        });
    }

    delete(path = '') {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                const response = isJsonString(xhr.responseText)
                    ? JSON.parse(xhr.responseText)
                    : {};
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(response);
                } else if (parseInt(xhr.status) == 401) {
                    logoutSuccessful();
                    resolve(response);
                } else {
                    //statuscode khong phai 2xx
                    reject(
                        new CustomError(
                            xhr.status,
                            response.message || 'Unknow error on server!',
                        ),
                    );
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                console.log('delete onerror');
                reject(new CustomError(500, 'Unknow error!'));
            };
            xhr.onabort = () => {
                console.log('delete onabort');
                debugger;
            };
            xhr.onloadend = () => {
                console.log('onloadend');
            };
            xhr.ontimeout = () => {
                console.log('ontimeout');
            };
            xhr.onprogress = () => {
                console.log('onprogress');
            };
            xhr.open('DELETE', PREFIX_URL + path, true);
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.withCredentials = true;
            xhr.send();
        });
    }
    // getAllResponseHeaders() {
    //     return this.xhr.getAllResponseHeaders();
    // }
}
var api = new Api();
// export default new Api();
