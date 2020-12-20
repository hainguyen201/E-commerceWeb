const template = `
<div style="width: 985px" class="container-list-product" id="list_product">
</div>
`;

class TransactionAdElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'ad-transaction-element';
    }

    constructor() {
        super();
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
     
        
    }
}


export default [TransactionAdElement];
