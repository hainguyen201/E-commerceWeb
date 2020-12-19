class Base {
    /**
     * Điều hướng đến trang html và truyền param
     * @param {url muốn điều hướng đến} path
     * @param {tham số muốn truyền vào url} param
     */
    redirect(path, param) {
        param = [
            { name: 'param1', value: 'value1' },
            { name: 'param2', value: 2 },
        ];
        var expath = '';
        if (param) {
            param.forEach((p) => {
                expath += p.name + '=' + p.value;
                expath += '&';
            });
            expath = expath.slice(0, -1);
            var redirectUrl = path + '?' + expath;
            // thay đổi địa chỉ
            window.location.href = redirectUrl;
            console.log(redirectUrl);
        }
    }
    /**
     *
     * @param {tên của param muốn lấy giá trị} name
     * @param {*} url
     */
    getQueryParam(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regexS = '[\\?&]' + name + '=([^&#]*)';
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    }
    addDom(scope, htmlName) {
        var url = htmlName;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                scope.innerHTML = this.responseText;
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}
