var addToCart = () => {
    //ngăn sự kiện lan ra trong thẻ a
    event.stopPropagation();

    //ngăn sự kiện lan ra trong chính button nằm trong thẻ a;
    event.preventDefault();
    const productID = parseInt(event.currentTarget.parentNode.parentNode.id);
    const productName =
        document.querySelector(`#name-product${productID}`).textContent || '';
    const data = {
        ProductID: productID,
        Amount: 1,
    };
    let userID = localStorage.getItem('USER_ID');
    if (userID) {
        ProductOrderService.addToCartByUserID(userID, data)
            .then((data) => {
                notifSuccess(
                    `Thêm thành công 1 sản phẩm ${productName} vào giỏ hàng`,
                );
                updateShowTotalProductOfCart();
            })
            .catch((err) => {
                notifFailure('Sản phẩm đã được thêm trong giỏ hàng');
            });
    } else {
        ProductOrderService.addToCartBySession(data)
            .then((data) => {
                notifSuccess(
                    `Thêm thành công 1 sản phẩm ${productName} vào giỏ hàng`,
                );
                updateShowTotalProductOfCart();
            })
            .catch((err) => {
                notifFailure('Sản phẩm đã được thêm trong giỏ hàng');
            });
    }
};

var updateShowTotalProductOfCart = () => {
    const userID = localStorage.getItem('USER_ID');
    const e = document.querySelector('.icon-amount-items');
    if (userID) {
        ProductOrderService.getCartByUserID(userID)
            .then((data) => {
                e.innerHTML = data.length || 0;
            })
            .catch((err) => {
                notifFailure('Không thể lấy thông tin giỏ hàng');
            });
    } else {
        ProductOrderService.getCartBySessionID()
            .then((result) => {
                e.innerHTML = result.length || 0;
            })
            .catch((err) => {
                notifFailure('Không thể lấy thông tin giỏ hàng');
            });
    }
};
//
var catalogService = new CatalogService()

function openEditCatalogModal(event, id) {
    var catalogEdit = document.querySelector(`#catalog-${id} .edit-catalog-modal input[name="CatalogName"]`);
    var catalogName = event.target.parentElement.parentElement.querySelector('td[name="CatalogName"]').innerText
    catalogEdit.value = catalogName;
    document.querySelector(`#catalog-${id} .edit-catalog-modal`).style.display = 'block';
}

function openAddCatalogModal() {
    document.getElementById('add-catalog-modal').style.display = 'block';
}

function openDeleteCatalogModal(id) {
    document.querySelector(`#catalog-${id} .delete-catalog-modal`).style.display = 'block'
}

function closeEditCatalogModal(id) {
    document.querySelector(`#catalog-${id} .edit-catalog-modal`).style.display = 'none'
}

function closeAddCatalogModal() {
    document.getElementById('add-catalog-modal').style.display = 'none'
}

function closeDeleteCatalogModal(id) {
    document.querySelector(`#catalog-${id} .delete-catalog-modal`).style.display = 'none'
}

function deleteCatalog(id) {
    catalogService.deleteCatalog(id).then((result) => {
        loadCatalogData()
    })
}

function editCatalog(event, catalogid) {
    var catalog = {};
    var parent = event.target.parentElement.parentElement
    catalog.CatalogName = parent.querySelector('input[name="CatalogName"]').value;
    //id cần cập nhật
    catalogID = catalogid
    console.log(catalogID);
    console.log(catalog);
    // api submit here
    catalogService.updateCatalog(catalogid, catalog).then((result) => {
        console.log(result);
        closeEditCatalogModal(catalogid)
        loadCatalogData()

    })
}

function addCatalog(event) {
    var catalogName = document.querySelector('#add-catalog-modal input[name="CatalogName"]').value;
    catalogService.addCatalog({ CatalogName: catalogName }).then((result) => {
        closeAddCatalogModal()
        loadCatalogData()
    })
}

function addCatalogTable(catalogs) {
    var catalog = `<br>
    <div class="add-catalog">
        <button class="btn" onclick="openAddCatalogModal('post')">Thêm danh mục</button>
        <div id="add-catalog-modal" class="modal">

            <!-- Modal content -->
            <div class="modal-content catalog-modal-content">
                <!-- <span class="close">&times;</span> -->
                <div class="form-catalog">
                    <div class="catalog-input">
                        <input type="text" name="CatalogName" placeholder="Tên danh mục" class='catalog-value type-input'>
                    </div>
                    <br>
                    <div>
                        <button class="btn btn-cancel" onclick="closeAddCatalogModal()">Hủy</button>
                        <button class="btn" onclick="addCatalog(event)">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <br>
    <div class="main-table">
        <table class="catalog-table-content">
            <thead>
                <tr>
                    <th>Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th>Ngày tạo</th>
                    <th>Ngày sửa</th>
                    <th>Hoạt động</th>
                </tr>
            </thead>
            <tbody>`
    catalogs.forEach(element => {
        var _catalog = element
        catalog += `<tr id="catalog-${_catalog.CatalogID}">
<td name="CatalogID">${_catalog.CatalogID}</td>
<td name="CatalogName">${_catalog.CatalogName}</td>
<td name="CatalogCreatedDate">${_catalog.CatalogCreatedDate}</td>
<td name="CatalogModifiedDate">${_catalog.CatalogModifiedDate}</td>`
        catalog += `<td style="text-align:center">
        <button id="delete-catalog" class="btn" onclick="openDeleteCatalogModal(${_catalog.CatalogID})">Xóa</button>
        <div class="delete-catalog-modal modal">

            <!-- Modal content -->
            <div class="modal-content catalog-modal-content">
                <!-- <span class="close">&times;</span> -->
                <div class="form-catalog">
                    <div class="confirm-info">Bạn có chắc muốn xóa ?</div>
                    <br>
                    <div>
                        <button class="btn btn-cancel" onclick="closeDeleteCatalogModal(${_catalog.CatalogID})">Hủy</button>
                        <button class="btn" onclick="deleteCatalog(${_catalog.CatalogID})">Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    <button id="edit-catalog" class="btn" onclick="openEditCatalogModal(event, ${_catalog.CatalogID})">Sửa</button>
    <div class="edit-catalog-modal modal">

        <!-- Modal content -->
        <div class="modal-content catalog-modal-content">
            <!-- <span class="close">&times;</span> -->
            <div class="form-catalog">
                <div class="catalog-input">
                    <input type="text" name="CatalogName" placeholder="Tên danh mục" class='catalog-value type-input'>

                </div>
                <br>
                <div>
                    <button class="btn btn-cancel" onclick="closeEditCatalogModal(${_catalog.CatalogID})">Hủy</button>
                    <button class="btn" onclick="editCatalog(event, ${_catalog.CatalogID})">Gửi</button>

                </div>
            </div>
        </div>
    </div>
</td>
</tr>`
    });
    catalog += `</tbody>
    </table>
</div>`

    var list_catalog = document.getElementsByClassName('list-catalog')[0];
    list_catalog.innerHTML = catalog
}

function loadCatalogData() {
    catalogService.getListCatalog().then((result) => {
        console.log(result)
        addCatalogTable(result);
    })
}
loadCatalogData()