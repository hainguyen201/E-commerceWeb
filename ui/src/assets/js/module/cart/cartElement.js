const template = `

<div id="cart-header">
    <h2>Giỏ hàng</h2>
    <span>(2 sản phẩm)</span>
</div>
<div id="cart-list-product">
    <div id="cart-product-item">
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
export default class CartElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'cart-element';
    }

    constructor() {
        super();
        this.id = 'cart-container';
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        let UserID = localStorage.getItem('USER_ID');
        if (UserID) {
            ProductOrderService.getCartByUserID(UserID)
                .then((data) => {
                    if (data.length > 0) {
                        appendHTML(data);
                    } else appendHTML(null);
                })
                .catch((error) => {
                    notifFailure('Không thể lấy thông tin giỏ hàng');
                });
        } else {
            ProductOrderService.getCartBySessionID()
                .then((data) => {
                    if (data.length > 0) {
                        appendHTML(data);
                    } else appendHTML(null);
                })
                .catch((error) => {
                    notifFailure('Không thể lấy thông tin giỏ hàng');
                });
        }

        const appendHTML = (data) => {
            let totalMoney = 0;
            let showAmountItems = document.querySelector('.icon-amount-items');
            showAmountItems.innerHTML = data == null ? 0 : data.length;
            let html = '';
            let headerHTML = `<div id="cart-header">
            <h2>Giỏ hàng</h2>
            <span>(${data.length} sản phẩm)</span>
        </div>`;
            let listItemsHTML = `<div id="cart-list-product">`;
            data.forEach((item) => {

                totalMoney += item.Amount * item.Price;
                listItemsHTML += `<div id="cart-product-item">
                <h3 id="vendor" style="padding: 10px;"><a is="router-link" href="/products/${
                    item.ProductID
                }">${item.ProductName}</a></h3>
                <div id="product-item">
                    <div class="container-img-cart-pr">
                        <img class="img-product" src="data:image/png;base64,${
                            item.Image
                        }" alt="">
                    </div>
                    <div style="margin-left: 20px;">
                        <p style="word-wrap: break-word; width: 410px;margin-top: 0px;">${
                            item.Content || 'Không có mô tả sản phẩm'
                        }</p>
                        <span style="color: #0c5db6;; cursor: pointer;">Xóa</span>
                    </div>
                    <div style="font-weight: bold;font-size: 16px;width: 130px;">
                        ${item.Price.formatMoney()} đ
                    </div>
                    <div id="amount-product" productID="1">
                        <span class="icon_adjust" id="minus-product" productID="1" style="cursor: pointer;"
                            onclick="onChangeAmountProduct()">-</span>
                        <span class="icon_adjust" id="amount-product-show" style="margin-left: -4px;">${
                            item.Amount
                        }</span>
                        <span class="icon_adjust" id="plus-product" productID="1"
                            style="margin-left: -5px;cursor: pointer;"
                            onclick="onChangeAmountProduct()">+</span>
                    </div>
                </div>
            </div>`;
            });
            listItemsHTML += `</div>`;

            let addressHTML;
            if (UserID) {
                UserService.getUserById(UserID)
                    .then((data) => {})
                    .catch(() => {});
                addressHTML = `<div style="float: right; width: 315px;">
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
                    <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">${totalMoney.formatMoney()}đ</span>
                </div>
                <div id="on-order" onclick="onOrder()">
                    Đặt hàng
                </div>
                </div>`;
            }

            if (data == null) {
                html = '<h2>Giỏ hàng trống</h2>';
            } else html = headerHTML + listItemsHTML + addressHTML;
            this.innerHTML = html;
        };
    }
}