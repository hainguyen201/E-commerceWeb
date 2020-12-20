var loginComponent = document.getElementsByClassName('content login')[0];
var signupComponent = document.getElementsByClassName('content signup')[0];
var opLogin = document.getElementById('op-login');
var opSignup = document.getElementById('op-signup');
var title = document.querySelector('#notif h2');
var description = document.querySelector('#notif p');
// var checkboxMale = document.getElementsByClassName('sex-male')[0];
// var checkboxFemale = document.getElementsByClassName('sex-female')[0];
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
    app.style.opacity = 0.1;
}

// var listCheckbox = [checkboxMale, checkboxFemale];

// onlyCheckOne = (e) => {
//     let element = e.target;
//     if (element.checked) {
//         listCheckbox.forEach((item) => {
//             if (item != element) {
//                 item.checked = false;
//             }
//         });
//     }
// };

// checkboxMale.addEventListener('change', this.onlyCheckOne);
// checkboxFemale.addEventListener('change', (e) => this.onlyCheckOne(e));

window.onclick = function (event) {
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
email.onkeydown = function (e) {
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
let adminE;
var containerIcon = document.querySelector('.header__search-cart');
const addIconAdmin = () => {
    const text = `<div id="icon-admin" class="_center_everything">
    <a style="border:1px solid #fff;border-radius:5px;padding:2px;" is="router-link" href="/admin/catalog">
        <img style="height: 30px;width: 30px;" src="/src/assets/img/icon-ad9.jpg" alt="">
    </a>
</div>`;
    adminE = createElementByText(text);
    containerIcon.appendChild(adminE);
};

var loginSuccessful = (user) => {
    if (user.Role == 1) {
        addIconAdmin();
    }
    localStorage.setItem('USER_ID', user.UserID);
    li_login.style.display = 'none';
    li_user.style.display = 'inline-block';
    a_user.innerHTML = user.UserName || 'USER_DEFAULT';
    a_user.setAttribute('href', `/users`);
    onCloseModal();
    updateShowTotalProductOfCart();
};

var logoutSuccessful = () => {
    if (localStorage.getItem('USER_ID')) {
        localStorage.removeItem('USER_ID');
    }
    if (isElement(adminE)) {
        containerIcon.removeChild(adminE);
    }
    li_login.style.display = 'inline-block';
    li_user.style.display = 'none';
    // document.dispatchEvent(new CustomEvent('page-load-route', { detail: '/' }));
    window.location.href = '/';
    updateShowTotalProductOfCart();
};

// var unexpectedLogout = () => {
//     debugger
//     if (localStorage.getItem('USER_ID')) {
//         localStorage.removeItem('USER_ID');
//     }
//     if (isElement(adminE)) {
//         containerIcon.removeChild(adminE);
//     }
//     notifFailure('Phiên đã hết! Hãy đăng nhập để có trải nghiệm tốt hơn');
//     li_login.style.display = 'inline-block';
//     li_user.style.display = 'none';
//     document.dispatchEvent(new CustomEvent('page-load-route', { detail: '/' }));
//     updateShowTotalProductOfCart();
// };
btnLogin.onclick = async function (event) {
    if (true) {
        try {
            if (checkValidation()) {
                let data = await userService.loginService(
                    email.value,
                    password.value
                );
                //let data = await userService.loginService('hainguyen', '1234');
                notifSuccess('Đăng nhập thành công');
                loginSuccessful(data.data[0]);
            }
        } catch (error) {
            notifFailure('Tên tài khoản hoặc mật khẩu không chính xác');
        }
        // /base.redirect('/list_product/index.html', '')
    }
};

let btnLogout = document.getElementById('button-logout');

btnLogout.onclick = async function logout(event) {
    try {
        let data = await userService.logout();
        notifSuccess('Đăng xuất thành công');
    } catch (error) {
        notifFailure('Đăng xuất thất bại');
    }
};

document.querySelector('.btn-signup').onclick = async function signup(e) {
    let nameE = document.querySelector('#s_name');
    let usernameE = document.querySelector('#s_username');
    let addressE = document.querySelector('#s_address');
    let phoneE = document.querySelector('#s_phone');
    let emailE = document.querySelector('#s_email');
    let passwordE = document.querySelector('#s_password');
    let vvv = document.querySelector('#vvv');

    if (isEmptyValue(usernameE.value) || isEmptyValue(passwordE.value)) {
        vvv.innerHTML =
            'Bạn cần nhập ít nhất username và mật khẩu để tạo tài khoản';
        return;
    }
    if (/ /g.test(usernameE.value)) {
        vvv.innerHTML = 'UserName không được chứa khoảng trống';
        return;
    }

    if (/ /g.test(passwordE.value) || passwordE.value.length < 8) {
        vvv.innerHTML = 'Mật khẩu không được chứa khoảng trống và trên 8 kí tự';
        return
    }
    const data = {
        UserName: usernameE.value,
        Password: passwordE.value,
        FullName: nameE.value,
        Email: emailE.value,
        Address: addressE.value,
        Phone: phoneE.value,
    };
    try {
        UserService.addUser(data)
            .then((result) => {
                vvv.style.color = 'green';
                vvv.innerHTML =
                    'Tạo tài khoản thành công, đăng nhập để mua hàng';
            })
            .catch((err) => {
                notifFailure('Tạo tài khoản thất bại');
            });
    } catch (error) {}
};
