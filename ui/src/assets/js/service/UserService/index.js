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
         * Đăng nhập bằng username và password
         * @param {*} userName 
         * @param {*} password 
         */
    async loginService(username, password) {
        try {
            let body = {
                UserName: username,
                Password: password
            }
            await api.post('/users/login', body);
        } catch (error) {
            throw error;
        }
        // await api.post('/users/login', body).then((result) => {
        //     return true;
        // }).catch((err) => {
        //     debugger
        //     //throw new Error();
        // });
    }
}