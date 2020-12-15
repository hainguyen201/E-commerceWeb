const template = `
<div style="width: 985px" class="container-list-product" id="list_product">
</div>
`;

export default class RootElement extends HTMLDivElement {

    static get route() { return ""; }
    static get is() { return "root-r" }

    constructor() {
        super();
        const templateEl = document.createElement("template");
        templateEl.innerHTML = template;
        this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        var list_product = [];
        var containerListProduct = document.getElementById("list_product");
        var base = new Base();
        var userService = new UserService();
        // document.onload = function () {
        // }
        api.get("/products")
            .then((result) => {
                list_product = result.data;
                if (!!list_product && list_product.length > 0) {
                    addListProduct(list_product);
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });


        function createProductElement(product) {
            var template = document.createElement('template');
            html = '<div class="product">' +
                '<a id="' + product.ProductID + '" href="">' +
                '<div class="container-img">' +
                '<img class="img-product" src="' + 'data:image/png;base64,' + product.Image + '" alt="">' +
                '</div>' +
                '<p id="name-product">' +
                product.Name +
                '</p>' +
                '<span class="tooltip-product" id="tooltip-product-' + product.ProductID + '">' + product.Name + '</span>' +
                '<span id="price">' + product.Price.formatMoney() + ' &#8363&nbsp;&nbsp;</span>' +
                '<span id="discount">-' + product.Discount + '%</span>' +
                '<div style="margin-top: 20px;">' +
                '<button class="btn-addtocart">Thêm vào giỏ</button>' +
                '</div>' +
                '</a>' +
                '</div>';
            html = html.trim(); // Never return a text node of whitespace as the result
            template.innerHTML = html;
            let elementProduct = template.content.firstChild;

            elementProduct.onmousemove = function (e) {
                var x = e.clientX,
                    y = e.clientY;
                document.getElementById(`tooltip-product-${product.ProductID}`).style.top = (y + 20) + 'px';
                document.getElementById(`tooltip-product-${product.ProductID}`).style.left = (x + 20) + 'px';
            }
            return elementProduct;
        }

        function addListProduct(listProduct) {
            var listElement = listProduct.map((item, index) => {
                return createProductElement(item);
            });
            listElement.forEach(element => {
                containerListProduct.appendChild(element)
            })
        }
    }

}