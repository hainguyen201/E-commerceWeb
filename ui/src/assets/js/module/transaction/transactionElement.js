const template = `
<span id="change-address" style="font-size: small;float: right;color: #0c5db6;cursor: pointer;"
onclick="openInputAddress()">Thay đổi</span>

<div id="cart-header">
    <h2>Giỏ hàng</h2>
    <span>(2 sản phẩm)</span>
</div>
<div id="cart-list-product">
    <div id="" class="cart-product-item">
        <h3 id="vendor" style="padding: 10px;"><a href="">Nha cung cap</a></h3>
        <div id="product-item">
            <div class="container-img-cart-pr">
                <img class="img-product" src="./src/assets/img/icon-person.png" alt="">
            </div>
            <div style="margin-left: 20px;">
                <p style="word-wrap: break-word; width: 450px;margin-top: 0px;">May dien thoai sam sung
                    May dien thoai sam sung</p>
                <span style="color: #0c5db6;; cursor: pointer;">Xóa</span>
            </div>
            <div style="font-weight: bold;font-size: 16px;width: 130px;">
                190.000đ
            </div>
            <div id="amount-product" productID="1">
                <span class="icon_adjust" id="minus-product" productID="1" style="cursor: pointer;"
                    onclick="onChangeAmountProduct()">-</span>
                <span class="icon_adjust" id="amount-product-show" style="margin-left: -4px;">1</span>
                <span class="icon_adjust" id="plus-product" productID="1"
                    style="margin-left: -5px;cursor: pointer;"
                    onclick="onChangeAmountProduct()">+</span>
            </div>
        </div>
    </div>

</div>
<div style="float: right; width: 315px;">
    <div id="address-order">
        <span>Địa chỉ nhận hàng</span>
        <span id="change-address" style="font-size: small;float: right;color: #0c5db6;cursor: pointer;"
            onclick="openInputAddress()">Thay đổi</span>
        <h4>Lê Hải Quân | 0987654321</h4>
        <textarea type="text" id="address-order-input"
            disabled>aaaaaaaaaaaaaaaaaaaavvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvaaa</textarea>
    </div>
    <div id="cart-total-price">
        <span style="color:#787878">Thành tiền</span>
        <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">100.000đ</span>
    </div>
    <div id="on-order" onclick="onOrder()">
        Đặt hàng
    </div>
</div>
`;
export default class TransactionElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'transaction-element';
    }

    constructor() {
        super();
        this.id = '_trans';
        this.style.display = 'flex';
        this.style.flexWrap = 'wrap';
        this.style.width = '1300px';
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    openChange(transID) {
        let spanChange = document.getElementById(`change-address${transID}`);
        const nameE = document.querySelector(`#i-name${transID}`);
        const phoneE = document.querySelector(`#i-phone${transID}`);
        const noteE = document.querySelector(`#i-note${transID}`);
        const addressE = document.querySelector(`#i-address${transID}`);
        if (spanChange.textContent == 'Thay đổi') {
            spanChange.innerHTML = 'Lưu';
            addressE.removeAttribute('disabled');
            nameE.removeAttribute('disabled');
            phoneE.removeAttribute('disabled');
            noteE.removeAttribute('disabled');
        } else {
            const data = {
                DeliveryAddress: addressE.value,
                Receiver: nameE.value,
                PhoneReceiver: phoneE.value,
                Message: noteE.value,
            };
            TransactionService.updateTransactionByTransactionID(transID, data)
                .then((result) => {
                    notifSuccess(`Cập nhật giao dịch số ${transID} thành công`)
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
        let UserID = localStorage.getItem('USER_ID');
        let data = [];
        this.userID = UserID;
        let html = '';
        
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
                    }
                    else if(item.TransactionStatus == -1){
                        status = 'Đã hủy';
                        color = '#787878';
                    }
                    else if(item.TransactionStatus != 1){
                        status = 'Không xác định';
                        color = '#000';
                    }
                    html += `<div style="float: right; width: 315px;font-size:14px;margin:3px;">
                 <div id="address-order">
                     <span>Giao dịch số ${item.TransactionID} ngày ${date}</span>
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
                     <span style="color:${color};font-size:12px;">${status}</span>
                 </div>
                 <div id="cart-total-price" style="margin:0px !important;">
                     <span style="color:#787878">Tổng số tiền</span>
                     <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">${item.Payment.formatMoney()}đ</span>
                 </div>
                 </div>`;
                });
            } else html = '<h1>Không có giao dịch nào</h1>';
            this.innerHTML = html;
        };

        if (UserID) {
            TransactionService.getTransactionByUserID(UserID)
                .then((result) => {
                    appendHTML(result);
                })
                .catch((err) => {
                    notifFailure('Không thể lấy giao dịch');
                });
        } else {
            TransactionService.getTransactionBySession()
                .then((result) => {
                    appendHTML(result);
                })
                .catch((err) => {
                    notifFailure('Không thể lấy giao dịch');
                });
        }
    }
}
