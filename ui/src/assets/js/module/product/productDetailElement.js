const template = `
<h1>Product</h1>
`;

export default class ProductDetailElement extends HTMLDivElement {

    static get route() { return "/(\\d+)"; }
    static get is() { return "product-detail"; }

    constructor() {
        super();
        const templateEl = document.createElement("template");
        templateEl.innerHTML = template;
        this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        const productID = this.params[0];
        console.log(this.params)
        this.setAttribute('id', `product-item-${productID}`);
        this.setAttribute('class', 'product-item')
        const h1 = this.getElementsByTagName('h1');
        var producthtml = ` <div class="product-detail">
        <div class="product-image">
            <image src='/assets/img/1.jpg'/>
        </div>
        <div class="product-info">
            <div class="product-name">
            </div>
            <div class="product-price">
                <div class="product-main-price"></div>
                <div class="product-discount"></div>
            </div>
            <div class="product-amount"></div>
            <div class="product-action">

            </div>
        </div>
    </div>`
        this.innerHTML = producthtml
            // h1[0].innerHTML = productID;

        //this.innerText(productID);
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template(store);
        // this.appendChild(templateEl.content.cloneNode(true));
    }

}