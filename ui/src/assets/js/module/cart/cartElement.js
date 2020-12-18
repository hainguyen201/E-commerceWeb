const template = `
<h1>Product</h1>
`;
export default class CartElement extends HTMLDivElement {

    static get route() { return ""; }
    static get is() { return "cart-element" }

    constructor() {
        super()
        const templateEl = document.createElement("template");
        templateEl.innerHTML = template;
        this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
    }

}