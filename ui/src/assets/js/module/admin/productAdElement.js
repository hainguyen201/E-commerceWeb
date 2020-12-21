const template = `
<div class="menu">
    <div class="menu-title content">Quản lý</div>
    <div class="menu-content">
    <a href="/admin/catalog"><div class="menu-item content">Danh mục</div></a>
    <a href="/admin/product"><div class="menu-item content">Sản phẩm</div></a>
    <a href="/admin/transaction"><div class="menu-item content">Giao dịch</div></a>
    </div>
</div>
`;

class ProductAdElement extends HTMLDivElement {
    static get route() {
        return '';
    }
    static get is() {
        return 'ad-product-element';
    }

    constructor() {
        super();
        this.classList.add('dashboard');
        // const templateEl = document.createElement("template");
        // templateEl.innerHTML = template;
        // this.appendChild(templateEl.content.cloneNode(true));
    }

    connectedCallback() {
        const menuElement = createElementByText(template);
        this.appendChild(menuElement);
        let produchtml;
        let addProductTable = (products) => {
            produchtml = `
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
                    <tbody>`;
            products.forEach((_product) => {
                produchtml += `
                <tr id="product-${_product.ProductID}">
                            <td name="ProductID">${_product.ProductID}</td>
                            <td name="Catalog" style="display: none;" value="${
                                _product.CatalogID
                            }"></td>
                            <td name="ProductName">${_product.ProductName}</td>
                            <td name="Price">${_product.Price}</td>
                            <td name="Content">${
                                _product.Content ? _product.Content : ''
                            }</td>
                            <td name="Discount">${_product.Discount}</td>
                            <td name="Remain">${_product.Remain}</td>
                            <td name="Image">
                                <img src="${
                                    'data:image/png;base64,' + _product.Image
                                }" alt="" class="product-image">
                            </td>
                            <td name="ProductCreatedDate">${
                                _product.ProductCreatedDate
                                    ? _product.ProductCreatedDate
                                    : ''
                            }</td>
                            <td name="ProductModifiedDate">${
                                _product.ProductModifiedDate
                                    ? _product.ProductModifiedDate
                                    : ''
                            }</td>
                            <td style="text-align:center">
                                <button id="delete-product" class="btn" onclick="openDeleteProductModal(${
                                    _product.ProductID
                                })">Xóa</button>
                                <div class="delete-product-modal modal">
        
                                    <!-- Modal content -->
                                    <div class="modal-content product-modal-content">
                                        <!-- <span class="close">&times;</span> -->
                                        <div class="form-product">
                                            <div class="confirm-info">Bạn có chắc muốn xóa ?</div>
                                            <br>
        
                                            <div>
                                                <button class="btn btn-cancel" onclick="closeDeleteProductModal(${
                                                    _product.ProductID
                                                })">Hủy</button>
                                                <button class="btn" onclick="deleteProduct(${
                                                    _product.ProductID
                                                })">Gửi</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button id="edit-product" class="btn" onclick="openEditProductModal(${
                                    _product.ProductID
                                })">Sửa</button>
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
                                                    <button class="btn btn-cancel" onclick="closeEditProductModal(${
                                                        _product.ProductID
                                                    })">Hủy</button>
                                                    <button class="submit btn" onclick="editProduct(${
                                                        _product.ProductID
                                                    })">Gửi</button>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
            });
            produchtml += `
            </tbody>
            </table>
        </div>
        </div>`;
            // var productElement = document.querySelector('.list-product')
            // productElement.innerHTML = produchtml;
            this.appendChild(createElementByText(produchtml));
        };

        productService
            .getAllProduct()
            .then((result) => {
                console.log(result);
                addProductTable(result.data);
            })
            .catch((err) => {
                notifFailure('Không thể lấy danh sách sản phẩm');
            });
    }
}

export default [ProductAdElement];
