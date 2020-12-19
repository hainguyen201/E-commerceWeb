const template = `
<div id="catalog-product">
<div id="current-catalog">
    <a is="router-link" class="item-cc" href="">Trang chu ></a>
</div>
<a is="router-link" id="catalog-item" style="color: #000;" href="">
    <div class="catalog-item">
        aa
    </div>
</a>
</div>
`;
export default class CatalogElement extends HTMLDivElement {
    static get route() { return ""; }
    static get is() { return "catalog-element" }

    constructor() {
        super();
        this.id = "catalog-product";
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
        // catalogService.getListCatalog().then((data) => {
        //     if (data.length > 0) {
        //         appendHTML(data);
        //     }
        // }).catch((err) => {
        //     notifFailure(err.toString());
        // });

        // let appendHTML = (data) => {
        //     let html = `<div id="current-catalog">
        //     <a class="item-cc" href="/">Trang chu ></a>
        // </div>`
        //     data.forEach(item => {
        //         html += `<a id="catalog-item" style="color: #fff;" href="/catalogs/${item.CatalogID}">
        //         <div class="catalog-item">
        //             ${item.CatalogName}
        //         </div>
        //     </a>`;
        //     });
        //     this.innerHTML = html;
        // }
    }

    connectedCallback() {
        //{ CatalogID = '0', CatalogName = 'DANH MỤC CHƯA CÓ TÊN', ParentID = '', CatalogCreatedDate = '', CatalogModifiedDate = '' }
        let listCatalog = [];
        const currentCatalogID = this.currentCatalogID;
        catalogService.getListCatalog().then((data) => {
            if (data.length > 0) {
                appendHTML(data);
            }
        }).catch((err) => {
            notifFailure(err.toString());
        });

        let appendHTML = (data) => {
            let html = `<div id="current-catalog">
            <a is="router-link" class="item-cc" href="/">Trang chủ</a>`;
            if (currentCatalogID) {
                let currentCatalogName = data.find((item) => item.CatalogID == currentCatalogID).CatalogName;
                html += `<a is="router-link" class="item-cc" href="/catalogs/${currentCatalogID}"> > ${currentCatalogName}</a>`;
            }
            html += ` </div>`;
            data.forEach(item => {
                if (item.CatalogID == currentCatalogID) {
                    html += `<a is="router-link" id="catalog-item" style="color: #000;" href="/catalogs/${item.CatalogID}">
                    <div style="background-color: #9bbffe !important;" class="catalog-item">
                        ${item.CatalogName}
                    </div>
                </a>`;
                } else
                    html += `<a is="router-link" id="catalog-item" style="color: #000;" href="/catalogs/${item.CatalogID}">
                <div class="catalog-item">
                    ${item.CatalogName}
                </div>
            </a>`;
            });
            this.innerHTML = html;
        }
    }
}

//customElements.define(CatalogElement.is, CatalogElement, { extends: 'div' });