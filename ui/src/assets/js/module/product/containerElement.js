const template = `
<h1>Product</h1>
`;
class ProductElement extends HTMLDivElement {

  static get route() { return ""; }
  static get is() { return "product-element" }

  constructor() {
    super()
  }

  connectedCallback() {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = template;
    this.appendChild(templateEl.content.cloneNode(true));
  }

}

export default [ProductElement];