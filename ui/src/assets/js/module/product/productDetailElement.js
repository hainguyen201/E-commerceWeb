const template = `<div style="background-color: #c8c8c8; padding: 10px; border-radius: 5px;">
<a href="/" is="router-link" class="link-relation">Trang chủ ></a>
<a href="/catalogs/1" is="router-link" class="link-relation">Danh mục ></a>
<a href="/products/1" is="router-link" class="link-relation">kkkkk</a>
</div>
<div id="product-item-show">
<div>
    <div class="container-img-product-detail">
        <img class="img-product" src="data:image/png;base64,${IMG_DEFAULT_BASE64_CODE}" alt="">
    </div>
    <div id="list-image-product" style="display: flex;">
        <div class="container-img-product-detail-list">
            <img class="img-product" src="data:image/png;base64,${IMG_DEFAULT_BASE64_CODE}" alt="">
        </div>
        <div class="container-img-product-detail-list">
            <img class="img-product" src="data:image/png;base64,${IMG_DEFAULT_BASE64_CODE}" alt="">
        </div>
    </div>
</div>
<div style="border-left:1px solid #c8c8c8;" id="detail-pr-description">
    <div style="height: 100px;">
        <p style="font-size: 24px;word-wrap: break-word;line-height: 1.1;">hello</p>
    </div>
    <div id="price-pr-detail" style="font-size: 30px; font-weight: bolder; height: 40px;border-bottom: 1px solid #c8c8c8;">
        1900000đ<span style="font-size: 14px;font-weight: lighter;">&nbsp;&nbsp; 20%</span>
    </div>
    <div id="description-pr-detail" style="border-bottom: 1px solid #c8c8c8;">
        <p style="font-size: 19px;word-wrap: break-word;line-height: 1; height: 140px;">
            
        </p>
    </div>
    <div>
        <p style="font-size: 15px;word-wrap: break-word; height: 20px;color: #787878;">Số lượng còn
            lại 1</p>
    </div>
    <div id="amount-product">
        <span class="icon_adjust" id="minus-product" style="cursor: pointer;">-</span>
        <span class="icon_adjust" id="amount-product-detail-show"
            style="margin-left: -2px;">1</span>
        <span class="icon_adjust" id="plus-product" style="margin-left: -3px;cursor: pointer;"
            onclick="onChangeAmountPrDetail()">+</span>
    </div>
    <div id="on-order" onclick="onAddToCart()" style="font-size: 17px;margin-top: 70px;">
        Chọn mua
    </div>
</div>
</div>`;

export default class ProductDetailElement extends HTMLDivElement {
    static get route() {
        return '/(\\d+)';
    }
    static get is() {
        return 'product-detail';
    }

    // querySelector("#minus-product").addEventListener('onclick',()=>{

    // });

    // handleClick(ev) {
    //     debugger
    //     eval('this.' + ev.target.getAttribute('onclick'))
    //     ev.stopPropagation();
    // }

    onChangeAmountPrDetail() {
        let maxAmount = this.productItem.Remain || 0;
        let amount = document.getElementById('amount-product-detail-show');
        var valueAmount = parseInt(amount.textContent) || 1;
        if (event.currentTarget.textContent == '-' && valueAmount > 1) {
            valueAmount -= 1;
        } else if (
            event.currentTarget.textContent == '+' &&
            valueAmount < maxAmount
        ) {
            valueAmount += 1;
        }
        amount.innerText = `${valueAmount}`;
    }

    onAddToCart() {
        //api
        const am = parseInt(
            document.querySelector('#amount-product-detail-show').textContent
        );
        const data = {
            ProductID: this.productItem.ProductID,
            Amount: am,
        };
        let userID = localStorage.getItem('USER_ID');
        if (userID) {
            ProductOrderService.addToCartByUserID(userID, data)
                .then((data) => {
                    notifSuccess(
                        `Thêm thành công ${am} sản phẩm ${this.productItem.ProductName} vào giỏ hàng`
                    );
                    updateShowTotalProductOfCart();
                })
                .catch((err) => {
                    notifFailure('Sản phẩm đã được thêm trong giỏ hàng');
                });
        } else {
            ProductOrderService.addToCartBySession(data)
                .then((data) => {
                    notifSuccess(
                        `Thêm thành công ${am} sản phẩm ${this.productItem.ProductName} vào giỏ hàng`
                    );
                    updateShowTotalProductOfCart();
                })
                .catch((err) => {
                    notifFailure('Sản phẩm đã được thêm trong giỏ hàng');
                });
        }
    }

    onChangeShowImg() {
        let currentImage = document.querySelector('#img-pr-detail');
        let changeImage = event.currentTarget.childNodes[0].nextSibling;
        let temp = IMG_DEFAULT_BASE64;
        temp = currentImage.src;
        currentImage.src = changeImage.src;
        changeImage.src = temp;
    }

    constructor() {
        super();
        // document.querySelector("#minus-product").addEventListener('onclick', function (params) {
        //     debugger
        // })
        //const shadowRoot = this.attachShadow({mode: 'open'});
        // shadowRoot.querySelector("#minus-product").addEventListener('onclick',function (params) {
        //         debugger
        // })
        // this.id = 'pr_detail';
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    disconnectedCallback() {
        console.log('disconnectedCallback');
    }

    adoptedCallback() {
        console.log('adoptedCallback');
    }

    attributeChangedCallback() {
        console.log('attributeChangedCallback');
    }

    connectedCallback() {
        const dafaultProduct = {
            CatalogID: '',
            ProductID: '',
            ProductName: '',
            Discount: '',
            Price: '',
            Content: '',
            Image: '',
            ImageList: '',
            ProductCreatedDate: '',
            ProductModifiedDate: '',
            Remain: 0,
        };
        const productID = this.params[0];
        console.log('product-id', this.params);
        this.setAttribute('product-id', `${productID}`);
        this.id = 'pr_detail';
        this.setAttribute('class', 'product-item-container');
        productService
            .getProductById(productID)
            .then((data) => {
                let t = data.data[0];
                for (const p in t) {
                    if (t[p] == null || t[p] == 'null' || t[p] == '') {
                        t[p] = undefined;
                    }
                }
                this.productItem = t;
                append(t);
            })
            .catch(() => {
                notifFailure();
            });
        const append = async ({
            CatalogName = 'Danh mục',
            CatalogID = '',
            ProductID = '',
            ProductName = '',
            Discount = 0,
            Price = 0,
            Content = 'Không có mô tả nào',
            Image = IMG_DEFAULT_BASE64_CODE,
            ImageList = '',
            ProductCreatedDate = '',
            ProductModifiedDate = '',
            Remain = 0,
        }) => {
            let producthtml = `<div style="background-color: #c8c8c8; padding: 10px; border-radius: 5px;">
        <a href="/" is="router-link" class="link-relation">Trang chủ ></a>
        <a href="/catalogs/${CatalogID}" is="router-link" class="link-relation">${CatalogName} ></a>
        <a href="/products/${productID}" is="router-link" class="link-relation">${ProductName}</a>
    </div>
    <div id="product-item-show">
        <div>
            <div class="container-img-product-detail">
                <img class="img-product" style="width:390px;height:390px;" id="img-pr-detail" src="data:image/png;base64,${Image}" alt="">
            </div>
            <div id="list-image-product" style="display: flex;">
                <div class="container-img-product-detail-list" onclick="${
                    this.id
                }.onChangeShowImg()">
                    <img class="img-product" src="data:image/png;base64,${IMG_DEFAULT_BASE64_CODE}" alt="">
                </div>
                <div class="container-img-product-detail-list">
                    <img class="img-product" src="data:image/png;base64,${IMG_DEFAULT_BASE64_CODE}" alt="">
                </div>
            </div>
        </div>
        <div style="border-left:1px solid #c8c8c8;" id="detail-pr-description">
            <div style="height: 100px;">
                <p style="font-size: 24px;word-wrap: break-word;line-height: 1.1;">${ProductName}</p>
            </div>
            <div id="price-pr-detail" style="font-size: 30px; font-weight: bolder; height: 40px;border-bottom: 1px solid #c8c8c8;">
                ${Price.formatMoney()}đ<span style="font-size: 14px;font-weight: lighter;">&nbsp;&nbsp; ${Discount}%</span>
            </div>
            <div id="description-pr-detail" style="border-bottom: 1px solid #c8c8c8;">
                <p style="font-size: 19px;word-wrap: break-word;line-height: 1; height: 140px;">
                    ${Content}
                </p>
            </div>
            <div>
                <p style="font-size: 15px;word-wrap: break-word; height: 20px;color: #787878;">Số lượng còn
                    lại ${Remain}</p>
            </div>
            <div id="amount-product">
                <span class="icon_adjust" id="minus-product" onclick="${
                    this.id
                }.onChangeAmountPrDetail()" style="cursor: pointer;">-</span>
                <span class="icon_adjust" id="amount-product-detail-show"
                    style="margin-left: -2px;">1</span>
                <span class="icon_adjust" id="plus-product" style="margin-left: -3px;cursor: pointer;"
                onclick="${this.id}.onChangeAmountPrDetail()">+</span>
            </div>
            <div id="on-order" onclick="${
                this.id
            }.onAddToCart()" style="font-size: 17px;margin-top: 70px;">
                Chọn mua
            </div>
        </div>
    </div>`;
            this.innerHTML = producthtml;
        };
    }
}

// document.querySelector("#minus-product").addEventListener("onclick", () => {

// });

// var onChangeAmountPrDetail = () => {
//     debugger
//     var maxAmount = 5;
//     let amount = document.getElementById("amount-product-detail-show");
//     var valueAmount = parseInt(amount.textContent) || 1;
//     if (event.currentTarget.textContent == "-" && valueAmount > 1) {
//         valueAmount -= 1;
//     }
//     else if (event.currentTarget.textContent == "+" && valueAmount < maxAmount) {
//         valueAmount += 1;
//     }
//     amount.innerText = `${valueAmount}`;
// }

// var onAddToCart = () => {

// }
