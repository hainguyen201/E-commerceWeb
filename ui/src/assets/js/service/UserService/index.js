class UserService {
    reqHeaderConfig(req) {
        req.setRequestHeader('Content-Type', 'application/json');
        return req;
    }
    async getUser(userName, passWord) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                console.log(request.responseText)
            }
            request.open('GET', "http://localhost:3000/users")
            await request.send();
        }
        /**
         * Đăng nhập 
         * @param {*} username 
         * @param {*} password 
         * @param {*} callback hàm để xử lý response
         */
    async loginService(username, password, callback) {
        var request = new XMLHttpRequest();
        var body = {
            UserName: username,
            Password: password
        }
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200)
                callback(request);
        }

        request.open('POST', "http://localhost:3000/users/login", true);
        request.setRequestHeader('Access-Control-Allow-Origin', '*')
        request.setRequestHeader('Content-Type', 'application/json');


        // request.setRequestHeader("Access-Control-Request-Method", "POST")
        // request.send(JSON.stringify(body));
        await request.send(JSON.stringify(body))
    }
}