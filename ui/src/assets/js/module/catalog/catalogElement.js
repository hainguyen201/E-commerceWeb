const template = `
<div id="catalog-product">
<div id="current-catalog">
    <a class="item-cc" href="">Trang chu ></a>
    <a class="item-cc" href="">Trang chu ></a>
    <a class="item-cc" href="">Trang chu</a>
</div>
<a id="catalog-item" style="color: #fff;" href="">
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
        catalogService.getListCatalog().then((data) => {
            if (data.length > 0) {
                appendHTML(data);
            }
        }).catch((err) => {
            notifFailure(err.toString());
        });

        let appendHTML = (data) => {
            let html = `<div id="current-catalog">
            <a class="item-cc" href="/">Trang chủ</a>
        </div>`
            data.forEach(item => {
                html += `<a id="catalog-item" style="color: #fff;" href="/catalogs/${item.CatalogID}">
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