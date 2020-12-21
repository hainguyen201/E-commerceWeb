const template = `
<div class="menu">
    <div class="menu-title content">Quản lý</div>
    <div class="menu-content">
    <a is="router-link" href="/admin/catalog"><div class="menu-item content">Danh mục</div></a>
    <a is="router-link" href="/admin/product"><div class="menu-item content">Sản phẩm</div></a>
    <a is="router-link" href="/admin/transaction"><div class="menu-item content">Giao dịch</div></a>
    </div>
</div>
`;
class TransactionAdElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'transaction-ad-element';
    }

    constructor() {
        super();
        this.classList.add('dashboard');
        this.id = '_';
        // this.style.display = 'flex';
        // this.style.flexWrap = 'wrap';
        // this.style.width = '1300px';
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    openChange(transID) {
        const selectE = createElementByText(`     <select name="" id="s-status${transID}">
        <option value="0">Đang được giao</option>
        <option value="-1">Đã hủy</option>
        <option value="1">Đã được giao</option>
    </select>`);
        let spanChange = document.getElementById(`change-address${transID}`);
        const nameE = document.querySelector(`#i-name${transID}`);
        const phoneE = document.querySelector(`#i-phone${transID}`);
        const noteE = document.querySelector(`#i-note${transID}`);
        const addressE = document.querySelector(`#i-address${transID}`);
        const statusE = document.querySelector(`#i-status${transID}`);
        if (spanChange.textContent == 'Thay đổi') {
            statusE.parentNode.replaceChild(selectE, statusE);
            spanChange.innerHTML = 'Lưu';
            addressE.removeAttribute('disabled');
            nameE.removeAttribute('disabled');
            phoneE.removeAttribute('disabled');
            noteE.removeAttribute('disabled');
        } else {
            let _status = document.querySelector(`#s-status${transID}`).value;
            const data = {
                DeliveryAddress: addressE.value,
                Receiver: nameE.value,
                PhoneReceiver: phoneE.value,
                Message: noteE.value,
                TransactionStatus: _status,
            };
            TransactionService.updateTransactionByTransactionID(transID, data)
                .then((result) => {
                    notifSuccess(`Cập nhật giao dịch số ${transID} thành công`);
                    this.connectedCallback();
                })
                .catch((err) => {
                    notifFailure('Cập nhật giao dịch thất bại');
                });
            spanChange.innerHTML = 'Thay đổi';
            addressE.disabled = true;
            nameE.disabled = true;
            phoneE.disabled = true;
            noteE.disabled = true;
        }
    }

    connectedCallback() {
        let menuElement;
        // while (this.hasChildNodes) {
        //     this.removeChild(this.firstChild);
        // }
        // if (isElement(menuElement)) {
        //     this.removeChild(menuElement);
        // }
        this.innerHTML = '';
        menuElement = createElementByText(template);
        this.appendChild(menuElement);
        let UserID = localStorage.getItem('USER_ID');
        let data = [];
        this.userID = UserID;
        let html =
            '<div style="display:flex;flex-wrap:wrap;width:1000px" id="_trans">';

        const appendHTML = (data) => {
            if (data != null && data.length > 0) {
                data.forEach((item) => {
                    let date = 'KHÔNG CÓ';
                    if (!isEmptyValue(item.TransactionCreatedDate)) {
                        date = new Date(
                            item.TransactionCreatedDate
                        ).formatddMMyyyy();
                    }
                    let status = 'Đã được giao';
                    let color = 'red';
                    let changeE = '';
                    if (item.TransactionStatus == 0) {
                        changeE = `<span id="change-address${item.TransactionID}" style="font-size: small;float: right;color: #0c5db6;cursor: pointer;"
                        onclick="${this.id}.openChange(${item.TransactionID})">Thay đổi</span>`;
                        status = 'Đang được giao';
                        color = 'blue';
                    } else if (item.TransactionStatus == -1) {
                        status = 'Đã hủy';
                        color = '#787878';
                    } else if (item.TransactionStatus != 1) {
                        status = 'Không xác định';
                        color = '#000';
                    }
                    html += `<div style="float: right; width: 315px;font-size:14px;margin:3px;">
                 <div id="address-order">
                     <span>Giao dịch số ${
                         item.TransactionID
                     } ngày ${date}</span>
                    ${changeE}
                     <input disabled value="${
                         item.Receiver || ''
                     }" style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-name${
                        item.TransactionID
                    }" placeholder="Họ tên người nhận"/>
                      <input disabled type="number" value="${
                          item.PhoneReceiver
                      }" style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-phone${
                        item.TransactionID
                    }" placeholder="Số điện thọai"/>
                      <input value="${
                          item.Message
                      }" disabled type="text" style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-note${
                        item.TransactionID
                    }" placeholder="Ghi chú"/>
                     <textarea disabled style="border: 1px solid #787878;margin-top: 8px;resize: none;border: none;width: 285px; overflow: hidden;
                     min-height: 50px;" placeholder="Địa chỉ" type="text" id="i-address${
                         item.TransactionID
                     }"/>${item.DeliveryAddress}</textarea>
                     <span id="i-status${
                         item.TransactionID
                     }" style="color:${color};font-size:12px;">${status}</span>
                 </div>
                 <div id="cart-total-price" style="margin:0px !important;">
                     <span style="color:#787878">Tổng số tiền</span>
                     <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">${item.Payment.formatMoney()}đ</span>
                 </div>
                 </div>`;
                });
                html += `</div>`;
            } else html = '<h1>Không có giao dịch nào</h1>';
            this.appendChild(createElementByText(html));
        };

        if (UserID) {
            TransactionService.getAllTransaction()
                .then((result) => {
                    debugger;
                    appendHTML(result);
                })
                .catch((err) => {
                    notifFailure('Không thể lấy giao dịch');
                });
        }
    }
}

export default [TransactionAdElement];
