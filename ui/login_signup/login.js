var loginComponent = document.getElementsByClassName("content login")[0];
var signupComponent = document.getElementsByClassName("content signup")[0];
var opLogin = document.getElementById("op-login");
var opSignup = document.getElementById("op-signup");
var title = document.querySelector("#notif h2");
var description = document.querySelector("#notif p");
var checkboxMale = document.getElementsByClassName("sex-male")[0];
var checkboxFemale = document.getElementsByClassName("sex-female")[0];

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
    }
    else {
        loginComponent.style.display = "none";
        signupComponent.style.display = "block";
        opLogin.style.borderBottom = "3px solid #fff";
        opSignup.style.borderBottom = "3px solid #1ba8ff";
        title.innerHTML = "Tạo tài khoản"
        description.innerHTML = "Tạo tài khoản để theo dõi đơn hàng, lưudanh sách sản phẩm yêu thích, nhậnnhiều ưu đãi hấp dẫn."
    }
    //console.log(this.event.target.id); 
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


