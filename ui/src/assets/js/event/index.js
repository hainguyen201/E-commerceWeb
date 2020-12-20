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

function openEditCatalogModal(event) {
    var catalogEdit = document.querySelector('#edit-catalog-modal input[name="CatalogName"]');
    var catalogName = event.target.parentElement.parentElement.querySelector('td[name="CatalogName"]').innerText
    catalogEdit.value = catalogName;
    document.getElementById('edit-catalog-modal').style.display = 'block';

}

function openAddCatalogModal() {

    document.getElementById('add-catalog-modal').style.display = 'block';

}

function closeEditCatalogModal() {
    document.getElementById('edit-catalog-modal').style.display = 'none'
}

function closeAddCatalogModal() {
    document.getElementById('add-catalog-modal').style.display = 'none'
}

function editCatalog(event) {
    var catalog = {};
    var parent = event.target.parentElement.parentElement
    catalog.CatalogName = parent.querySelector('input[name="CatalogName"]').value;
    //id cần cập nhật
    catalogID = parent.querySelector('input[name="CatalogName"]')
    console.log(catalogID);
    console.log(catalog);
    // api submit here
}