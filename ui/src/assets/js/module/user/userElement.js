const template = `
`;

export default class UserElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'user-element';
    }

    constructor() {
        super();
        this.setAttribute('id', 'user_container');
        this.classList.add('_center_everything');
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    editUser() {
        const submElement = document.querySelector('#btn-subm');
        const editElement = document.querySelector('#btn-edit');
        const userNameE = document.querySelector('#UserName');
        const fullNameE = document.querySelector('#FullName');
        const emailE = document.querySelector('#Email');
        const addressE = document.querySelector('#Address');
        const phoneE = document.querySelector('#Phone');
        const passwordE = document.querySelector('#Password');
        submElement.style.display = 'block';
        editElement.style.display = 'none';
        userNameE.disabled = false;
        fullNameE.disabled = false;
        emailE.disabled = false;
        addressE.disabled = false;
        phoneE.disabled = false;
        passwordE.parentNode.style.display = 'block';
    }

    submitUser() {
        const submElement = document.querySelector('#btn-subm');
        const editElement = document.querySelector('#btn-edit');
        const userNameE = document.querySelector('#UserName');
        const fullNameE = document.querySelector('#FullName');
        const emailE = document.querySelector('#Email');
        const addressE = document.querySelector('#Address');
        const phoneE = document.querySelector('#Phone');
        const passwordE = document.querySelector('#Password');
        // userNameE.disabled = true;
        // fullNameE.disabled = true;
        // emailE.disabled = true;
        // addressE.disabled = true;
        // phoneE.disabled = true;
        // passwordE.parentNode.style.display = 'none';
        // submElement.style.display = 'none';
        // editElement.style.display = 'block';
        const data = {
            UserID: this.userID,
            FullName: fullNameE.value,
            Email: emailE.value,
            Phone: phoneE.value,
            Address: addressE.value,
            Password: passwordE.value,
            UserName: userNameE.value,
        };
        UserService.updateUserByID(this.userID, data)
            .then((result) => {
                notifSuccess('Cập nhật thành công');
                this.connectedCallback();
            })
            .catch((err) => {
                notifFailure('Cập nhật thất bại');
                this.connectedCallback();
            });
    }

    cancelUser() {
        const submElement = document.querySelector('#btn-subm');
        const editElement = document.querySelector('#btn-edit');
        const userNameE = document.querySelector('#UserName');
        const fullNameE = document.querySelector('#FullName');
        const emailE = document.querySelector('#Email');
        const addressE = document.querySelector('#Address');
        const phoneE = document.querySelector('#Phone');
        const passwordE = document.querySelector('#Password');
        userNameE.disabled = true;
        fullNameE.disabled = true;
        emailE.disabled = true;
        addressE.disabled = true;
        phoneE.disabled = true;
        passwordE.parentNode.style.display = 'none';
        submElement.style.display = 'none';
        editElement.style.display = 'block';
    }

    connectedCallback() {
        const userID = parseInt(localStorage.getItem('USER_ID'));
        this.userID = userID;
        let html = '';
        const appendHTML = (user) => {
            html = `<div class="user-form" style="font-size: 14px;">
            <div>
                <input type="text" disabled value="${
                    user.UserName || ''
                }"  id='UserName' class="type-input user-input-value"
                   placeholder="Tên tài khoản">
            </div>
            <br>
            <div>
                <input type="text" value="${
                    user.FullName || ''
                }" id='FullName' disabled class="type-input user-input-value" placeholder="Họ và tên">
            </div>
            <br>
            <div class="user-input">
                <input type="text" value="${
                    user.Email || ''
                }" id='Email' disabled class="type-input user-input-value" placeholder="Email">
            </div>
            <br>
            <div class="user-input">
                <input type="text" value="${
                    user.Address || ''
                }" id='Address' disabled class="type-input user-input-value" placeholder="Địa chỉ">
            </div>
            <br>
            <div class="user-input">
                <input type="text" value="${
                    user.Phone || ''
                }" id='Phone' disabled class="type-input user-input-value" placeholder="Số điện thoại">
            </div>
            <br>
            <div class="user-input" style="display:none;">
                <input type="password" value="" id='Password' class="type-input user-input-value"
                    placeholder="Mật khẩu">
            </div>
            <br>
            <div id="btn-subm" style="display: none;">
                <button onclick="${
                    this.id
                }.cancelUser()" class="btn btn-cancel">Hủy</button>
                <button class="btn" onclick="${
                    this.id
                }.submitUser()">Gửi</button>
            </div>
            <div id="btn-edit">
                <button class="btn" onclick="${
                    this.id
                }.editUser()">Chỉnh sửa</button>
            </div>
        </div>`;
            this.innerHTML = html;
        };
        UserService.getUserById(userID)
            .then((result) => {
                appendHTML(result.data[0]);
            })
            .catch((err) => {
                notifFailure('Không thể lấy thông tin user');
            });
    }
}
