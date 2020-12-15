const template = `
<h1>Modern JS is awesome</h1>
<p>You don't need a JS framework anymore</p>
`;

export default class ProductElement extends HTMLDivElement {

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