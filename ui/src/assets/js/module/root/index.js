const template = `
<div style="width: 985px" class="container-list-product" id="list_product">
</div>
`;

class RootElement extends HTMLDivElement {
    static get route() { return ""; }
    static get is() { return "root-r" }

    constructor() {
        super();
        this.setAttribute("id", "container-product");
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        const catalogElement = document.createElement('div', { is: 'catalog-element' });
        this.appendChild(catalogElement);
        const listProductElement = createElementByText(template);
        this.appendChild(listProductElement);
        let list_product = [];
        let containerListProduct = document.getElementById("list_product");
        api.get("/products")
            .then((result) => {
                list_product = result.data;
                if (!!list_product && list_product.length > 0) {
                    addListProduct(list_product);
                }
                console.log(result);
            })
            .catch((err) => {
                // document.dispatchEvent(new CustomEvent('page-loading'));
                notifFailure("Không thể lấy products")
            });
        // document.onload = function () {
        // }
        function createProductElement(product) {
            let template = document.createElement('template');
            let html = '<div class="product">' +
                '<a is="router-link" id="' + product.ProductID + '" href="/products/' + product.ProductID + '">' +
                '<div class="container-img">' +
                '<img class="img-product" src="' + 'data:image/png;base64,' + product.Image + '" alt="">' +
                '</div>' +
                '<p id="name-product">' +
                product.ProductName +
                '</p>' +
                '<span class="tooltip-product" id="tooltip-product-' + product.ProductID + '">' + product.ProductName + '</span>' +
                '<span id="price">' + product.Price.formatMoney() + ' &#8363&nbsp;&nbsp;</span>' +
                '<span id="discount">-' + product.Discount + '%</span>' +
                '<div style="margin-top: 20px;">' +
                '<button onclick="addToCart()" class="btn-addtocart">Thêm vào giỏ</button>' +
                '</div>' +
                '</a>' +
                '</div>';
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            let elementProduct = template.content.firstChild;

            elementProduct.onmousemove = function (e) {
                let x = e.clientX,
                    y = e.clientY;
                document.getElementById(`tooltip-product-${product.ProductID}`).style.top = (y + 20) + 'px';
                document.getElementById(`tooltip-product-${product.ProductID}`).style.left = (x + 20) + 'px';
            }
            return elementProduct;
        }

        function addListProduct(listProduct) {
            let listElement = listProduct.map((item, index) => {
                return createProductElement(item);
            });
            listElement.forEach(element => {
                containerListProduct.appendChild(element)
            })
        }
    }

}

console.log("root import");

export default [RootElement];