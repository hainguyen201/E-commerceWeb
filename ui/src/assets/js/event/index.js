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
            })
            .catch((err) => {
                notifFailure('Sản phẩm đã được thêm trong giỏ hàng');
            });
    }
};

var updateShowTotalProductOfCart = () => {};
