var containerListProduct = document.getElementById("list_product");
var base = new Base();
var list_product = [{
        "productID": "1",
        "name": "Ghế xoay hòa phát A",
        "price": 400000,
        "content": "ghe xoay hoa phat dep",
        "imageLink": "../assets/img/list_product//3.jpg",
        "imageList": "list string base64",
        "catalogId": "1",
        "discount": "20",
        "remain": "199"
    },
    {
        "productID": "2",
        "name": "Ghế xoay hòa phát B",
        "price": 400000,
        "content": "ghe xoay hoa phat dep",
        "imageLink": "../assets/img/list_product//3.jpg",
        "imageList": "list string base64",
        "catalogId": "1",
        "discount": "20",
        "remain": "199"
    },
    {
        "productID": "3",
        "name": "Ghế xoay hòa phát C",
        "price": 400000,
        "content": "ghe xoay hoa phat dep",
        "imageLink": "../assets/img/list_product//3.jpg",
        "imageList": "list string base64",
        "catalogId": "1",
        "discount": "20",
        "remain": "199"
    },
    {
        "productID": "4",
        "name": "Ghế xoay hòa phát D",
        "price": 400000,
        "content": "ghe xoay hoa phat dep",
        "imageLink": "../assets/img/list_product//3.jpg",
        "imageList": "list string base64",
        "catalogId": "1",
        "discount": "20",
        "remain": "199"
    },
];


function createProductElement(product) {
    var template = document.createElement('template');
    html = '<div class="product">' +
        '<a id="' + product.productID + '" href="">' +
        '<div class="container-img">' +
        '<img class="img-product" src="' + product.imageLink + '" alt="">' +
        '</div>' +
        '<p id="name-product">' +
        product.name +
        '</p>' +
        '<span class="tooltip-product" id="tooltip-product-' + product.productID + '">' + product.name + '</span>' +
        '<span id="price">' + product.price.formatMoney() + ' &#8363&nbsp;&nbsp;</span>' +
        '<span id="discount">' + product.discount + '%</span>' +
        '<div style="margin-top: 20px;">' +
        '<button class="btn-addtocart">Thêm vào giỏ</button>' +
        '</div>' +
        '</a>' +
        '</div>';
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    let elementProduct = template.content.firstChild;

    elementProduct.onmousemove = function(e) {
        var x = e.clientX,
            y = e.clientY;
        document.getElementById(`tooltip-product-${product.productID}`).style.top = (y + 20) + 'px';
        document.getElementById(`tooltip-product-${product.productID}`).style.left = (x + 20) + 'px';
    }
    return elementProduct;
}

function addListProduct(listProduct) {
    var listElement = listProduct.map((item, index) => {
        return createProductElement(item);
    });
    containerListProduct.appendChild(listElement[0]);
    containerListProduct.appendChild(listElement[1]);
    containerListProduct.appendChild(listElement[2]);
    containerListProduct.appendChild(listElement[3]);
}

addListProduct(list_product);