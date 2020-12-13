class UserService {
    reqHeaderConfig(req) {
        req.setRequestHeader('Content-Type', 'application/json');
        return req;
    }
    async getUser(userName, passWord) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            console.log(request.responseText)
        }
        request.open('GET', "http://localhost:3000/users")
        await request.send();
    }
    /**
     * Đăng nhập bằng username và password
     * @param {*} userName 
     * @param {*} password 
     */
    loginService(username, password) {
        var body = {
            UserName: username,
            Password: password
        }
        api.post('/users/login', body).then((result) => {
            debugger
            return true;
        }).catch((err) => {
            debugger
            throw CustomError(402, 'Unauthorized');
        });
    }
}