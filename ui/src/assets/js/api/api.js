class Api {
    constructor() {
        this.xhrGet = new XMLHttpRequest();
        this.xhrPost = new XMLHttpRequest();
    }

    defaultHeaderConfig() {
        this.xhrPost.setRequestHeader('Content-Type', 'application/json');
        this.xhrPost.setRequestHeader('Access-Control-Allow-Origin', '*');
    }

    customHeaderConfig(header = []) {
        //this.xhr.setRequestHeader();
    }

    get(path = '') {
        return new Promise((resolve, reject) => {
            let xhr = this.xhrGet;
            //this.defaultHeaderConfig(xhr);
            xhr.onload = () => {
                if (parseInt(xhr.status / 100) == 2) {
                    //resolve({ statusCode: xhr.status, data: JSON.parse(xhr.responseText) });
                    resolve(JSON.parse(xhr.responseText));
                }
                else {
                    //statuscode khong phai 2xx
                    reject(new CustomError(xhr.status, "hello"));
                }
            };
            xhr.onerror = () => {
                //loi mang hoac may chu
                reject(new CustomError(500, "Unknow error!"));
            }
            xhr.open('GET', PREFIX_URL + path, true);
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
                }
                else {
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
            xhr.open('POST', PREFIX_URL + path, true);
            this.defaultHeaderConfig();
            xhr.send(JSON.stringify(data));
        });
    }
    // get(path = '', returnResponse = this.returnResponse) {
    //     this.xhr.open('GET', PREFIX + path, true);
    //     this.defaultHeaderConfig();
    //     this.xhr.send();
    //     this.xhr.onreadystatechange = () => {
    //         if (this.xhr.status == 200 && this.xhr.readyState == 4) {
    //             return returnResponse(this.xhr.responseText)
    //         }
    //     }
    // }

    // returnResponse(responseText) {
    //     return responseText;
    // }

    getAllResponseHeaders() {
        return this.xhr.getAllResponseHeaders();
    }

}

// export default new Api();