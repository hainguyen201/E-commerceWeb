var loginComponent = document.getElementsByClassName('content login')[0];
var signupComponent = document.getElementsByClassName('content signup')[0];
var opLogin = document.getElementById('op-login');
var opSignup = document.getElementById('op-signup');
var title = document.querySelector('#notif h2');
var description = document.querySelector('#notif p');
var checkboxMale = document.getElementsByClassName('sex-male')[0];
var checkboxFemale = document.getElementsByClassName('sex-female')[0];
var app = document.getElementById('app');
var modalLoginSignup = document.getElementsByClassName('modal-login-signup')[0];
var iconCloseModal = document.getElementsByClassName('icon-close')[0];
var btnLogin = document.getElementById('btn-login');
modalLoginSignup.style.visibility = 'hidden';
var base = new Base();

function helloWorld() {
    console.log('Hello world!');
}

function changeContent() {
    if (this.event.target.id == 'op-login') {
        loginComponent.style.display = 'block';
        signupComponent.style.display = 'none';
        opSignup.style.borderBottom = '3px solid #fff';
        opLogin.style.borderBottom = '3px solid #1ba8ff';
        title.innerHTML = 'Đăng nhập';
        description.innerHTML =
            'Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.';
    } else {
        loginComponent.style.display = 'none';
        signupComponent.style.display = 'block';
        opLogin.style.borderBottom = '3px solid #fff';
        opSignup.style.borderBottom = '3px solid #1ba8ff';
        title.innerHTML = 'Tạo tài khoản';
        description.innerHTML =
            'Tạo tài khoản để theo dõi đơn hàng, lưudanh sách sản phẩm yêu thích, nhậnnhiều ưu đãi hấp dẫn.';
    }
    //console.log(this.event.target.id);
}

function openLoginSignupModal() {
    modalLoginSignup.style.visibility = 'visible';
    app.style.opacity = 0.3;
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
};

checkboxMale.addEventListener('change', this.onlyCheckOne);
checkboxFemale.addEventListener('change', (e) => this.onlyCheckOne(e));

window.onclick = function(event) {
    if (event.target == modalLoginSignup) {
        onCloseModal();
    }
};

function onCloseModal() {
    app.style.opacity = 1;
    modalLoginSignup.style.visibility = 'hidden';
}

let email = document.querySelector('input.email');
let password = document.querySelector('input.password');
let validate = document.querySelector('.validate-login');
validate.innerHTML = ' ';
let reEmail = /\S+@\S+\.\S+/;
let rePass = /^\w{7,15}$/;
email.onkeydown = function(e) {
    // if (!reEmail.exec(email.value)) {
    //     validate.innerHTML = "Email không hợp lệ";
    // } else validate.innerHTML = "";
};

password.onkeydown = () => {
    // if (!rePass.exec(password.value)) {
    //     validate.innerHTML = "Mật khẩu không bao gồm kí tự đặc biệt và từ 8 đến 15 kí tự"
    // } else
    validate.innerHTML = '';
};

// var base = new Base();
//kiểm tra input đầu vào
function checkValidation() {
    if (validate.textContent == '') {
        return true;
    } else validate.innerHTML = 'Nhập thông tin đăng nhập';
    return false;
}

let li_login = document.querySelector('li.login');
let li_user = document.querySelector('li.user');
let a_user = document.querySelector('a#user-name');

var loginSuccessful = (user) => {
    localStorage.setItem('USER_ID', user.UserID);
    li_login.style.display = 'none';
    li_user.style.display = 'inline-block';
    a_user.innerHTML = user.UserName || 'USER_DEFAULT';
    onCloseModal();
};

var logoutSuccessful = () => {
    if (localStorage.getItem('USER_ID')) {
        localStorage.removeItem('USER_ID');
    }
    li_login.style.display = 'inline-block';
    li_user.style.display = 'none';
};

var unexpectedLogout = () => {
    if (localStorage.getItem('USER_ID')) {
        localStorage.removeItem('USER_ID');
    }
    notifFailure('Phiên đã hết! Hãy đăng nhập để có trải nghiệm tốt hơn');
    li_login.style.display = 'inline-block';
    li_user.style.display = 'none';
};
btnLogin.onclick = async function(event) {
    if (true) {
        try {
            if (checkValidation()) {
                let data = await userService.loginService(
                    email.value,
                    password.value,
                );
                //let data = await userService.loginService('hainguyen', '1234');
                notifSuccess('Đăng nhập thành công');
                loginSuccessful(data.data[0]);
            }
        } catch (error) {
            notifFailure('Đăng nhập thất bại');
        }
        // /base.redirect('/list_product/index.html', '')
    }
};

let btnLogout = document.getElementById('button-logout');

btnLogout.onclick = async function logout(event) {
    try {
        let data = await userService.logout();
        logoutSuccessful();
        notifSuccess('Đăng xuất thành công');
    } catch (error) {
        notifFailure('Đăng xuất thất bại');
    }
};
// document.getElementById('test-cor').onclick = function() {
//     // api.delete('/productorders/1/1').then((result) => {

//     //         console.log(result);
//     //     })
//     //     .catch((err) => {
//     //         // document.dispatchEvent(new CustomEvent('page-loading'));

//     //     })
//     api.put('/productorders/1', { ProductID: 2, Amount: 8 }).then((result) => {

//             console.log(result);
//         })
//         .catch((err) => {
//             // document.dispatchEvent(new CustomEvent('page-loading'));

//         })
// };