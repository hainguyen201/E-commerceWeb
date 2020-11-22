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
    root.style.opacity = 0.2;
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
// var base = new Base();
//kiểm tra input đầu vào
function checkValidation() {
    return true;
}
//lấy id của người dùng
btnLogin.onclick = function(event) {
    if (checkValidation()) {
        base.redirect('/list_product/index.html', '')
    }
}
userService.getUser('', '')