class UserService {
    getUser(userName, passWord) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(request.responseText)
        }
        request.open('GET', "http://localhost:3000/users")
        request.send();
    }
    loginService(userName, password) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(request.responseText)
        }
        var body = {
            UserName: "",
            PassWord: ""
        }
        request.onreadystatechange = function() {
            if (http.readyState == 4 && http.status == 200) {
                alert(http.responseText);
            }
        }
        request.setRequestHeader('Content-type', 'application/json')
        request.open('POST', "http://localhost:3000/users/login")
        request.send(body);
    }
}