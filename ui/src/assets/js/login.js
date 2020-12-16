var loginComponent = document.getElementsByClassName("content login")[0];
var signupComponent = document.getElementsByClassName("content signup")[0];
var opLogin = document.getElementById("op-login");
var opSignup = document.getElementById("op-signup");
var title = document.querySelector("#notif h2");
var description = document.querySelector("#notif p");
var checkboxMale = document.getElementsByClassName("sex-male")[0];
var checkboxFemale = document.getElementsByClassName("sex-female")[0];
var root = document.getElementById("root");
var modalLoginSignup = document.getElementsByClassName("modal-login-signup")[0];
var iconCloseModal = document.getElementsByClassName("icon-close")[0];
var btnLogin = document.getElementById('btn-login');
modalLoginSignup.style.visibility = "hidden";
var base = new Base();
var userService = new UserService();

function helloWorld() {
    console.log("Hello world!");
}

function changeContent() {
    if (this.event.target.id == "op-login") {
        loginComponent.style.display = "block";
        signupComponent.style.display = "none";
        opSignup.style.borderBottom = "3px solid #fff";
        opLogin.style.borderBottom = "3px solid #1ba8ff";
        title.innerHTML = "Đăng nhập"
        description.innerHTML = "Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn."
    } else {
        loginComponent.style.display = "none";
        signupComponent.style.display = "block";
        opLogin.style.borderBottom = "3px solid #fff";
        opSignup.style.borderBottom = "3px solid #1ba8ff";
        title.innerHTML = "Tạo tài khoản"
        description.innerHTML = "Tạo tài khoản để theo dõi đơn hàng, lưudanh sách sản phẩm yêu thích, nhậnnhiều ưu đãi hấp dẫn."
    }
    //console.log(this.event.target.id); 
}

function openLoginSignupModal() {
    modalLoginSignup.style.visibility = "visible";
    root.style.opacity = 0;
}

var listCheckbox = [checkboxMale, checkboxFemale];

onlyCheckOne = (e) => {
    let element = e.target;
    if (element.checked) {
        listCheckbox.forEach((item) => {
            if (item != element) {
                item.checked = false;
            }
        });
    }
}

checkboxMale.addEventListener("change", this.onlyCheckOne);
checkboxFemale.addEventListener("change", (e) => this.onlyCheckOne(e));

window.onclick = function(event) {
    if (event.target == modalLoginSignup) {
        onCloseModal();
    }
}

function onCloseModal() {
    root.style.opacity = 1;
    modalLoginSignup.style.visibility = "hidden";
}

let email = document.querySelector("input.email");
let password = document.querySelector("input.password");
let validate = document.querySelector(".validate-login");
validate.innerHTML = " ";
let reEmail = /\S+@\S+\.\S+/;
let rePass = /^\w{7,15}$/;
email.onkeydown = function(e) {
    if (!reEmail.exec(email.value)) {
        validate.innerHTML = "Email không hợp lệ";
    } else validate.innerHTML = "";
}

password.onkeydown = () => {
    if (!rePass.exec(password.value)) {
        validate.innerHTML = "Mật khẩu không bao gồm kí tự đặc biệt và từ 8 đến 15 kí tự"
    } else validate.innerHTML = "";
}

// var base = new Base();
//kiểm tra input đầu vào
function checkValidation() {
    if (validate.textContent == "") {
        return true;
    } else validate.innerHTML = "Nhập thông tin đăng nhập"
    return false;
}


let li_login = document.querySelector("li.login");
let li_user = document.querySelector("li.user");
let a_user = document.querySelector("a#user-name");

let loginSuccessful = (user) => {
    li_login.style.display = "none";
    li_user.style.display = "inline-block";
    a_user.innerHTML = user.UserName || "USER_DEFAULT";
}

btnLogin.onclick = async function(event) {
    // debugger
    if (true) {
        try {
            // if (checkValidation()) {
            let data = await userService.loginService('hainguyen', '1234');
            loginSuccessful(data.data[0]);
            //await userService.loginService(email.value, password.value);
            //}
        } catch (error) {
            alert(error.toString());
        }
        // /base.redirect('/list_product/index.html', '')
    }
}