class UserService {
    getUser(userName, passWord) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log(request.responseText)
        }
        request.open('GET', "http://localhost:3000/user")
        request.send();
    }
}