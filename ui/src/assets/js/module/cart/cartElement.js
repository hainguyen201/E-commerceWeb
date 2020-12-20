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
export default class CartElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'cart-element';
    }

    constructor() {
        super();
        this.classList.add('cart-container');
        this.id = '_cart';
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    removeProductInCart() {
        const productID =
            event.currentTarget.parentNode.parentNode.parentNode.id;
        if (this.userID) {
            ProductOrderService.deteleProductInCartByUserID(
                this.userID,
                productID
            )
                .then((result) => {
                    notifSuccess('Xóa thành công');
                    this.connectedCallback();
                })
                .catch((err) => {
                    notifFailure('Xóa thất bại');
                });
        } else {
            ProductOrderService.deleteProductInCartBySession(productID)
                .then((result) => {
                    notifSuccess('Xóa thành công');
                    this.connectedCallback();
                })
                .catch((err) => {
                    notifFailure('Xóa thất bại');
                });
        }
    }

    openInputAddress() {
        let spanChange = document.getElementById('change-address');
        let textAreaAddress = document.getElementById('address-order-input');
        if (spanChange.textContent == 'Thay đổi') {
            spanChange.innerHTML = 'Lưu';
            textAreaAddress.removeAttribute('disabled');
            textAreaAddress.style.border = '1px solid #787878';
        } else {
            if (this.userID) {
                UserService.updateUserByID(this.userID, {
                    ...this.user,
                    Address: textAreaAddress.textContent,
                })
                    .then((result) => {
                        notifSuccess('Thay đổi địa chỉ thành công');
                    })
                    .catch((err) => {
                        notifFailure('Thay đổi địa chỉ thất bại');
                    });
            }
            spanChange.innerHTML = 'Thay đổi';
            textAreaAddress.setAttribute('disabled', true);
            textAreaAddress.style.border = 'none';
        }
    }

    onChangeAmountProduct() {
        const update = () => {
            if (this.userID) {
                ProductOrderService.editAmountProductByUserID(this.userID, {
                    ProductID: productID,
                    Amount: valueAmount,
                })
                    .then((result) => {
                        this.connectedCallback();
                        notifSuccess('Thao tác thành công');
                    })
                    .catch((err) => {
                        notifFailure('Thao tác thất bại');
                    });
            } else {
                ProductOrderService.editAmountProductBySession({
                    ProductID: productID,
                    Amount: valueAmount,
                })
                    .then((result) => {
                        this.connectedCallback();
                        notifSuccess('Thao tác thành công');
                    })
                    .catch((err) => {
                        notifFailure('Thao tác thất bại');
                    });
            }
        };
        const parentNode = event.currentTarget.parentNode;
        const productID = parseInt(parentNode.parentNode.parentNode.id);
        let maxAmount = parseInt(parentNode.getAttribute('remain')) || 0;
        let valueAmount = parseInt(parentNode.childNodes[3].textContent) || 1;
        if (event.currentTarget.textContent == '-' && valueAmount > 1) {
            valueAmount -= 1;
            update();
        } else if (
            event.currentTarget.textContent == '+' &&
            valueAmount < maxAmount
        ) {
            valueAmount += 1;
            update();
        } else if (
            event.currentTarget.textContent == '+' &&
            valueAmount == maxAmount
        ) {
            notifFailure('Không thể thêm quá số lượng sản phẩm');
        }

        //Router.open('/cart');
    }

    onOrderToTransaction() {
        //Đặt hàng
    }

    connectedCallback() {
        let UserID = localStorage.getItem('USER_ID');
        if (UserID) {
            this.userID = UserID;
            ProductOrderService.getCartByUserID(UserID)
                .then((data) => {
                    if (data.length > 0) {
                        let user = {};
                        UserService.getUserById(UserID)
                            .then((u) => {
                                user = u.data[0];
                                this.user = user;
                                appendHTML(data, user);
                            })
                            .catch(() => {
                                notifFailure();
                            });
                    } else appendHTML([], null);
                })
                .catch((error) => {
                    notifFailure('Không thể lấy thông tin giỏ hàng');
                });
        } else {
            ProductOrderService.getCartBySessionID()
                .then((data) => {
                    if (data.length > 0) {
                        appendHTML(data, null);
                    } else appendHTML([], null);
                })
                .catch((error) => {
                    notifFailure('Không thể lấy thông tin giỏ hàng');
                });
        }

        let totalMoney = 0;
        let html = '';
        let headerHTML;
        let listItemsHTML;
        let addressHTML = ``;

        const appendHTML = (data, user) => {
            let showAmountItems = document.querySelector('.icon-amount-items');
            showAmountItems.innerHTML = data.length;
            headerHTML = `<div id="cart-header">
            <h2>Giỏ hàng</h2>
            <span>(${data.length} sản phẩm)</span>
        </div>`;
            listItemsHTML = `<div id="cart-list-product">`;
            data.forEach((item) => {
                totalMoney += item.Amount * item.Price;
                listItemsHTML += `<div id="${
                    item.ProductID
                }" class="cart-product-item">
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
                        <span onclick="${
                            this.id
                        }.removeProductInCart()" style="color: #0c5db6;; cursor: pointer;">Xóa</span>
                    </div>
                    <div style="font-weight: bold;font-size: 16px;width: 130px;">
                        ${item.Price.formatMoney()} đ
                    </div>
                    <div id="amount-product" remain="${
                        item.Remain || 0
                    }" productID="1">
                        <span class="icon_adjust" id="minus-product" productID="1" style="cursor: pointer;"
                            onclick="${
                                this.id
                            }.onChangeAmountProduct()">-</span>
                        <span class="icon_adjust" id="amount-product-show" style="margin-left: -4px;">${
                            item.Amount
                        }</span>
                        <span class="icon_adjust" id="plus-product" productID="1"
                            style="margin-left: -5px;cursor: pointer;"
                            onclick="${
                                this.id
                            }.onChangeAmountProduct()">+</span>
                    </div>
                </div>
            </div>`;
            });
            listItemsHTML += `</div>`;
            if (user) {
                addressHTML = `<div style="float: right; width: 315px;">
                <div id="address-order">
                    <span>Địa chỉ nhận hàng</span>
                 
                    <input value="${user.FullName}" style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-name" placeholder="Họ tên"/>
                     <input value="${user.Phone}" style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-phone" placeholder="Số điện thọai"/>
                    <textarea style="border: 1px solid #787878;margin-top: 8px;" placeholder="Địa chỉ" type="text" id="address-order-input"/>${user.Address}</textarea>
                </div>
                <div id="cart-total-price">
                    <span style="color:#787878">Thành tiền</span>
                    <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">${totalMoney.formatMoney()}đ</span>
                </div>
                <div id="on-order" onclick="${this.id}.onOrder()">
                    Đặt hàng
                </div>
                </div>`;
            } else {
                addressHTML = `<div style="float: right; width: 315px;">
                <div id="address-order">
                    <span>Địa chỉ nhận hàng</span>
    
                    <input style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-name" placeholder="Họ tên"/>
                     <input style="border:1px solid #787878;margin-top: 8px;width: 100%;" id="i-phone" placeholder="Số điện thọai"/>
                    <textarea style="border: 1px solid #787878;margin-top: 8px;" placeholder="Địa chỉ" type="text" id="address-order-input"></textarea>
                </div>
                <div id="cart-total-price">
                    <span style="color:#787878">Thành tiền</span>
                    <span style="color: #fe3834;float: right;font-size: 22px;font-weight: bold;">${totalMoney.formatMoney()}đ</span>
                </div>
                <div id="on-order" onclick="${this.id}.onOrderToTransaction()">
                    Đặt hàng
                </div>
                </div>`;
            }

            if (data.length == 0) {
                html = '<h2>Giỏ hàng trống</h2>';
            } else html = headerHTML + listItemsHTML + addressHTML;
            this.innerHTML = html;
        };

        const appendAddressHTML = () => {};
    }
}
