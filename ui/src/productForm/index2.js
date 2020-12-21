//
var product_add = {}
var product_update = {}
var catalogService = new CatalogService();
var productService = new ProductService();

function openAddProductModal() {
    document.getElementById('add-product-modal').style.display = 'block';
    var catalogEditElement = document.querySelector(`#add-product-modal select`)
    var catalogHtml = ``
    catalogService.getListCatalog().then((result) => {
        result.forEach(catalog => {

            catalogHtml += `<option  value="${catalog.CatalogID}">${catalog.CatalogName}</option>`;

        })
        catalogEditElement.innerHTML = catalogHtml;

    })
}

function openDeleteProductModal(id) {
    document.querySelector(`#product-${id} .delete-product-modal`).style.display = 'block'
}

function openEditProductModal(id) {
    var edit_modal = document.querySelector(`#product-${id} .edit-product-modal`)
    edit_modal.style.display = 'block'
    var product_input = edit_modal.getElementsByTagName('input')
    var i = 0;
    for (i = 0; i < product_input.length; i++) {
        if (product_input[i]['name'] != "Image") {
            var value = document.querySelector(`#product-${id} td[name=${product_input[i]['name']}]`).textContent;
            edit_modal.querySelector(`input[name=${product_input[i]['name']}]`).value = value;
        } else {

        }
        document.querySelector(`#product-${id}  .product-image-preview`).src = document.querySelector(`#product-${id} td[name="Image"] img`).src
    }
    var catalogEditElement = document.querySelector(`#product-${id} .edit-product-modal select`)
    var catalog_cur = document.querySelector(`#product-${id} td[name="Catalog"]`)

    var catalogID = catalog_cur.getAttribute('value');
    catalogEditElement.value = catalogID;
    var catalogHtml = ``
    catalogService.getListCatalog().then((result) => {
        result.forEach(catalog => {
            if (catalog.CatalogID == catalogID)
                catalogHtml += `<option value="${catalog.CatalogID}" selected="selected">${catalog.CatalogName}</option>`;
            else {
                catalogHtml += `<option  value="${catalog.CatalogID}">${catalog.CatalogName}</option>`;
            }
        })
        catalogEditElement.innerHTML = catalogHtml;

    })


}

function closeAddProductModal() {
    document.getElementById('add-product-modal').style.display = 'none'
}

function closeDeleteProductModal(id) {
    document.querySelector(`#product-${id} .delete-product-modal `).style.display = 'none'
}

function closeEditProductModal(id) {
    document.querySelector(`#product-${ id } .edit-product-modal `).style.display = 'none'

}


function addProduct() {

    var formproduct = [];
    formproduct = document.querySelector('#add-product-modal')
        // debugger
    formproduct = formproduct.getElementsByClassName('product-value')
    var i = 0;
    for (i = 0; i < formproduct.length; i++) {
        if (formproduct[i]['name'] === "Image") {

        } else {
            product_add[formproduct[i]['name']] = formproduct[i].value
        }
    }
    console.log(product_add);
    //api

    productService.addProduct(product_add).then((result) => {
        loadProductData()
    })
}

function editProduct(id) {
    var edit_modal = document.querySelector(`#product-${id} .edit-product-modal`)
    var product_input = edit_modal.getElementsByTagName('input')
    var i = 0;
    for (i = 0; i < product_input.length; i++) {
        if (product_input[i]['name'] != "Image") {
            product_update[product_input[i]['name']] = edit_modal.querySelector(`input[name=${product_input[i]['name']}]`).value;
        }
        // document.querySelector(`#product-${id}  .product-image-preview`).src = document.querySelector(`#product-${id} td[name="Image"] img`).src
    }
    var catalogEditElement = document.querySelector(`#product-${id} .edit-product-modal select`)
    product_update.CatalogID = catalogEditElement.value
    if (product_update.Image) {

    } else {
        product_update.Image = document.querySelector(`#product-${id} .edit-product-modal .product-image-preview`).src
    }
    console.log(product_update)
        //api update
    productService.updateProduct(product_update, id).then((result) => {
        loadProductData()
    })
}

function deleteProduct(id) {
    console.log(id)
        //api
    productService.deleteProduct(id).then((result) => {
        loadProductData()
    })
}

function previewImageEdit(id) {
    var file = document.querySelector(`#product-${id} .edit-product-modal input[name="Image"]`).files[0];
    var img = document.querySelector(`#product-${id} .edit-product-modal .product-image-preview`)


    const reader = new FileReader();

    reader.addEventListener("load", function() {
        // convert image file to base64 string
        img.src = reader.result;
        product_update.Image = reader.result.replace('data:image/jpeg;base64,', '')

    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function previewImageAdd() {
    var file = document.querySelector('#add-product-modal input[name="Image"]').files[0];
    var img = document.querySelector('#add-product-modal .product-image-preview')


    const reader = new FileReader();

    reader.addEventListener("load", function() {
        // convert image file to base64 string
        img.src = reader.result;
        product_add.Image = reader.result.replace('data:image/jpeg;base64,', '')

    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function loadProductData() {
    productService.getAllProduct().then((result) => {
        console.log(result)
        addProductTable(result.data)
    })
}

function addProductTable(products) {
    var produchtml = `
    <div class="list-product list-item">

    <br>
    <div class="add-product">
        <button class="btn" onclick="openAddProductModal()">Thêm sản phẩm</button>
        <div id="add-product-modal" class="modal">

            <!-- Modal content -->
            <div class="modal-content product-modal-content">
                <!-- <span class="close">&times;</span> -->
                <div class="form-product">
                    <div style="margin: 0 auto;">
                        <div class="product__form">
                            <div class="product__form-left">

                                <!-- Mã sản phẩm:<br>
                                <input type="text" name="ProductID" placeholder="mã sản phẩm" class="type-input product-value"> -->

                                <br>
                                <input type="text" name="ProductName" placeholder="Tên sản phẩm" class="type-input product-value">
                                <br>
                                <br>
                                <input type="number" name="Price" placeholder="Giá sản phẩm" class="type-input product-value">
                                <br><br>
                                <input type="text" name="Content" placeholder="Mô tả sản phẩm" class="type-input product-value">
                                <br><br>
                                <input type="file" id="avatar" name="Image" accept="image/png, image/jpeg" onchange="previewImageAdd()" class="product-value">
                                <br>
                                <br>
                                <img src="" alt="" class="product-image-preview">

                            </div>
                            <div class="product__form-right">
                                <!-- Mã danh mục:<br>
                                <input type="text" name="Catalog" placeholder="mã danh mục" class="type-input  product-value"> -->
                                <br>
                                <input type="number" name="Discount" placeholder="Giảm giá" class="type-input  product-value">
                                <br><br>
                                <input type="number" name="Remain" placeholder="Số lượng sản phẩm" class="type-input  product-value">
                                <br><br>
                                <select name="CatalogID" id="CatalogName" class="type-input  product-value">
                                  
                                </select>
                            </div>
                        </div>
                        <div class="sumit__form">
                            <br>
                            <button class="btn btn-cancel" onclick="closeAddProductModal()">Hủy</button>
                            <input class="submit btn" id="submit-product" type="submit" placeholder="Submit" onclick="addProduct()">
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
    <div class="main-table">
        <table class="product-table-content item-table-content">
            <thead>
                <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá sản phẩm</th>
                    <th>Nội dung</th>
                    <th>Giảm giá</th>
                    <th>Số lượng</th>
                    <th>Ảnh minh họa</th>
                    <th>Ngày Tạo</th>
                    <th>Ngày sửa</th>
                    <th>Hoạt động</th>
                </tr>
            </thead>
            <tbody>`
    products.forEach(_product => {
        produchtml += `
        <tr id="product-${_product.ProductID}">
                    <td name="ProductID">${_product.ProductID}</td>
                    <td name="Catalog" style="display: none;" value="${_product.CatalogID}"></td>
                    <td name="ProductName">${_product.ProductName}</td>
                    <td name="Price">${_product.Price}</td>
                    <td name="Content">${_product.Content?_product.Content:''}</td>
                    <td name="Discount">${_product.Discount}</td>
                    <td name="Remain">${_product.Remain}</td>
                    <td name="Image">
                        <img src="${"data:image/png;base64,"+_product.Image}" alt="" class="product-image">
                    </td>
                    <td name="ProductCreatedDate">${_product.ProductCreatedDate?_product.ProductCreatedDate:''}</td>
                    <td name="ProductModifiedDate">${_product.ProductModifiedDate?_product.ProductModifiedDate:''}</td>
                    <td style="text-align:center">
                        <button id="delete-product" class="btn" onclick="openDeleteProductModal(${_product.ProductID})">Xóa</button>
                        <div class="delete-product-modal modal">

                            <!-- Modal content -->
                            <div class="modal-content product-modal-content">
                                <!-- <span class="close">&times;</span> -->
                                <div class="form-product">
                                    <div class="confirm-info">Bạn có chắc muốn xóa ?</div>
                                    <br>

                                    <div>
                                        <button class="btn btn-cancel" onclick="closeDeleteProductModal(${_product.ProductID})">Hủy</button>
                                        <button class="btn" onclick="deleteProduct(${_product.ProductID})">Gửi</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="edit-product" class="btn" onclick="openEditProductModal(${_product.ProductID})">Sửa</button>
                        <div class="edit-product-modal modal">

                            <!-- Modal content -->
                            <div class="modal-content product-modal-content">
                                <!-- <span class="close">&times;</span> -->
                                <div class="form-product">
                                    <div style="margin: 0 auto;">
                                        <div class="product__form">
                                            <div class="product__form-left">

                                                <!-- Mã sản phẩm:<br>
                                                <input type="text" name="ProductID" placeholder="mã sản phẩm" class="type-input product-value"> -->

                                                <br>
                                                <input type="text" name="ProductName" placeholder="Tên sản phẩm" class="type-input product-value">
                                                <br>
                                                <br>
                                                <input type="number" name="Price" placeholder="Giá sản phẩm" class="type-input product-value">
                                                <br><br>
                                                <input type="text" name="Content" placeholder="Mô tả sản phẩm" class="type-input product-value">
                                                <br><br>
                                                <input type="file" id="avatar" name="Image" accept="image/png, image/jpeg" onchange="previewImageEdit(1)" class="product-value">
                                                <br>
                                                <br>
                                                <img src="" alt="" class="product-image-preview">

                                            </div>
                                            <div class="product__form-right">
                                                <!-- Mã danh mục:<br>
                                                <input type="text" name="CategoryID" placeholder="mã danh mục" class="type-input  product-value"> -->
                                                <br>
                                                <input type="number" name="Discount" placeholder="Giảm giá" class="type-input  product-value">
                                                <br><br>
                                                <input type="number" name="Remain" placeholder="Số lượng sản phẩm" class="type-input  product-value">
                                                <br><br>
                                                <select name="CategoryID" id="CategoryName" class="type-input  product-value">
                                            
                                                </select>
                                            </div>
                                        </div>
                                        <div class="sumit__form">
                                            <br>
                                            <button class="btn btn-cancel" onclick="closeEditProductModal(${_product.ProductID})">Hủy</button>
                                            <button class="submit btn" onclick="editProduct(${_product.ProductID})">Gửi</button>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`
    })
    produchtml += `
    </tbody>
    </table>
</div>
</div>`
    var productElement = document.querySelector('.list-product')
    productElement.innerHTML = produchtml;

}
loadProductData()