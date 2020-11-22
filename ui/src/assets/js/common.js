class Base {
    redirect(path, param) {
        param = [{ name: "param1", value: "value1" }, { name: "param2", value: 2 }]
        var expath = ""
        param.forEach(p => {
            expath += p.name + '=' + p.value;
            expath += '&';
        });
        expath = expath.slice(0, -1);
        var redirectUrl = path + '?' + expath;
        window.location.href = redirectUrl;
        console.log(redirectUrl);
    }

    getQueryParam(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    }
}