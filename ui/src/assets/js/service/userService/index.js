class UserService {
    reqHeaderConfig(req) {
        req.setRequestHeader('Content-Type', 'application/json');
        return req;
    }
    static async getUserById(id) {
        
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
            return await api.post('/users/login', body);
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

    async authService() {
        try {
            return await api.get('/auth');
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
    async logout() {
        try {
            return await api.post('/users/logout', '', false);
        } catch (error) {
            throw error;
        }
    }
}