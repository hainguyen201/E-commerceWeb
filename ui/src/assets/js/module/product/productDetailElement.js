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
        this.setAttribute('id',`product-item-${productID}`);
        const h1 = this.getElementsByTagName('h1');
        h1[0].innerHTML = productID;
        //this.innerText(productID);
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template(store);
        // this.appendChild(templateEl.content.cloneNode(true));
    }

}