const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const orderController = require('../controllers/order.controller')
const catalogController = require('../controllers/catalog.controller')
const authController = require('../controllers/auth.controller')
const productOrderController = require('../controllers/productorders.controller')
const transactionController = require('../controllers/transaction.controller')
const routes = [
    /**
     * Lấy danh sách toàn bộ user
     */
    {
        method: 'GET',
        path: '/users',
        handler: userController.findAll
    },
    /**
     * Lấy thông tin user theo id
     * /user/:userid
     * 
     */
    {
        method: 'GET',
        path: /^\/users\/([0-9a-z]+)/,
        handler: userController.findOne
    },
    /**
     * Cập nhật user
     * user/:userid
     {
        "FullName": "",
        "Email": "",
        "Phone": "",
        "Address": "HUST",
        "Password": "1234",
        "UserName": "hainguyen",
        "Role": 1
    }
     */
    {
        method: 'PUT',
        path: /^\/users\/([0-9a-z]+)/,
        handler: userController.updateUser
    },
    /**
     * Thêm mới user
    {
    "FullName": "",
    "Email": "",
    "Phone": "",
    "Address": "HUST",
    "Password": "1234",
    "UserName": "hainguyen",
    "Role": 1
    }
     */
    {
        method: 'POST',
        path: '/users',
        handler: userController.addUser
    },
    /**
     * Xóa user
     * /users/:userid
     */
    {
        method: 'DELETE',
        path: /^\/users\/([0-9a-z]+)/,
        handler: userController.deleteUser
    },
    /**
     * Đăng nhập
     * /users
    {
        UserName: hainguyen,
        Password:1234
    }
     */
    {
        method: 'POST',
        path: "/users/login",
        handler: userController.findByUserName
    },
    /**
     * Đăng xuất
     * /users/logout
    {}
     */
    {
        method: 'POST',
        path: "/users/logout",
        handler: userController.logout
    },
    /**
     * Lấy sản phẩm theo danh mục
     {
         /producs/catalogs/:catalogid
     }
     */
    {
        method: 'GET',
        path: /^\/products\/catalogs\/([0-9a-z]+)/,
        handler: productController.findProductByCatalogID
    },
    /**
     * Tìm kiếm sản phẩm theo tên
     * Lưu ý về tên: sử dụng dấu _ thay cho dấu cách
     * /products/names/iphone_12_64GB
     */
    {
        method: 'GET',
        path: /^\/products\/names\/([0-9a-z_]+)/,
        handler: productController.findProductByName
    },
    /**
     * Lấy toàn bộ sản phẩm
     * /products
     */
    {
        method: 'GET',
        path: '/products',
        handler: productController.findAllProducts
    },
    /**
     * Tìm kiếm sản phẩm theo id
     * /products/:productid
     */
    {
        method: 'GET',
        path: /^\/products\/([0-9a-z]+)/,
        handler: productController.findProductByID

    },
    /**
     * Thêm sản phẩm (cần đăng nhập với quyền admin (Trường role của user=1))
     * /products
     {
        "ProductID": 42,
        "ProductName": "mi note 10",
        "Price": 0,
        "Content": "",
        "Image": [chuyển đổi ảnh về base 64, có thể sử dụng api get product để xem mẫu của kiểu dữ liệu],
        "ImageList": "",
        "CatalogID": 1,
        "Discount": 0,
        "Remain": 0,
        "ProductCreatedDate": "2020-12-11",
        "ProductModifiedDate": "2020-12-11"
    }
     */
    {
        method: 'POST',
        path: '/products',
        handler: productController.addProductWithAuth
    },
    /**
     * Cập nhật sản phẩm với id
     {
        "ProductID": 42,
        "ProductName": "mi note 10",
        "Price": 0,
        "Content": "",
        "Image":[chuyển đổi ảnh về base 64, có thể sử dụng api get product để xem mẫu của kiểu dữ liệu] ,
        "ImageList": "",
        "CatalogID": 1,
        "Discount": 0,
        "Remain": 0,
        "ProductCreatedDate": "2020-12-11",
        "ProductModifiedDate": "2020-12-11"
    }
     */
    {
        method: 'PUT',
        path: /^\/products\/([0-9a-z]+)/,
        handler: productController.updateProductWithAuth
    },
    /**
     * Xóa sản phẩm theo id
     * 
     */
    {
        method: 'DELETE',
        path: /^\/products\/([0-9a-z]+)/,
        handler: productController.deleteProductWithAuth
    },
    /**
     * Lấy giỏ hàng theo id
     */
    {
        method: 'GET',
        path: /^\/orders\/([0-9a-z]+)/,
        handler: orderController.getOrderByID
    },
    {
        method: 'PUT',
        path: /^\/orders\/([0-9a-z]+)/,
        handler: orderController.updateOrder
    },
    {
        method: 'POST',
        path: '/orders',
        handler: orderController.addOrder
    },
    {
        method: 'DELETE',
        path: /^\/orders\/([0-9a-z]+)/,
        handler: orderController.deleteOrder
    },
    /**
     * Lấy danh mục sản phẩm theo id
     */
    {
        method: 'GET',
        path: /^\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.getCatalogByID
    },
    /**
     * Lấy toàn bộ danh mục sản phẩm
     */
    {
        method: 'GET',
        path: '/catalogs',
        handler: catalogController.getAllCatalog
    },
    /**
     * Cập nhật danh mục theo id,
     * /catalogs/:catalogid
     {
         "CatalogName": "dien thoai"
     }
     */
    {
        method: 'PUT',
        path: /^\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.updateCatalog
    },
    /**
     * Thêm danh mục  
     * /catalogs
     {
         "CatalogName": "dien thoai"
     }
     */
    {
        method: 'POST',
        path: '/catalogs',
        handler: catalogController.addCatalog
    },
    /**
     * Xóa danh mục theo id
     * /catalogs/:catalogid
     */
    {
        method: 'DELETE',
        path: /^\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.deleteCatalog
    },
    /**
     * Lấy thông tin xác thực người dùng theo session
     * /auth
     */
    {
        method: 'GET',
        path: '/auth',
        handler: authController.UserAuth
    },
    /**
     * Lấy thông tin sản phẩm trong giỏ hàng của user
     * /productorders/users/:userid
     */
    {
        method: 'GET',
        path: /^\/productorders\/users\/([0-9a-z]+)/,
        handler: productOrderController.getProductOrderByUserID
    },
    /**
     * Lấy thống tin giỏ hàng bằng session
     */
    {
        method: 'GET',
        path: '/productorders',
        handler: productOrderController.getProductOrderBySession
    },
    /**
     * Thêm sản phẩm vào giỏ hàng với khách hàng đã đăng ký
     * productorders/:userid   
    {
        "ProductID":4,
        "Amount": 3
     } 
     */
    {
        method: 'POST',
        path: /^\/productorders\/([0-9a-z]+)/,
        handler: productOrderController.addProductOrderWithUserID
    },
    /**
     * Sửa số lượng sản phẩm trong giỏ hàng với khách hàng đã đăng ký
     * productorders/:userid   
    {
        "ProductID":4,
        "Amount": 3
     } 
     */
    {
        method: 'PUT',
        path: /^\/productorders\/([0-9a-z]+)/,
        handler: productOrderController.updateProductOrderWithUserID
    },
    /**
     * Thêm sản phẩm vào giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
     * productorders/:userid    
     {
        "ProductID":4,
        "Amount": 3
     }
     */
    {
        method: 'POST',
        path: '/productorders',
        handler: productOrderController.addProductOrderWithSession
    },
    /**
     * Sửa số lượng sản phẩm trong giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
     * productorders/:userid    
     {
        "ProductID":4,
        "Amount": 3
     }
     */
    {
        method: 'PUT',
        path: '/productorders',
        handler: productOrderController.updateProductOrderWithSession
    },
    /**
     * Xóa sản phẩm khỏi giỏ hàng với khách hàng đã đăng nhập
     * /productorders/:userid/:productid
     */
    {
        method: 'DELETE',
        path: /^\/productorders\/([0-9a-z]+)\/([0-9a-z]+)/,
        handler: productOrderController.deleteProductOrderWithUserID
    },
    /**
     * Xóa sản phẩm khỏi giỏ hàng với khách hàng chưa đăng nhập (sử dụng session)
     * /productorders/:productid
     */
    {
        method: 'DELETE',
        path: /^\/productorders\/([0-9a-z]+)/,
        handler: productOrderController.deleteProductOrderWithSession
    },
    /**
     * Lấy giao dịch đã thực hiện của user đã đăng nhập
     * /transactions/:userid
     */
    {
        method: 'GET',
        path: /^\/transactions\/([0-9a-z]+)/,
        handler: transactionController.getTransactionByUserID
    },
    /**
     * Lấy giao dịch đã thực hiện của user chưa đăng nhập (sử dụng session)
     * /transactions
     */
    {
        method: 'GET',
        path: "/transactions",
        handler: transactionController.getTransactionBySession
    },
    /**
     * Xác nhận giao dịch với user đã đăng nhập
     * /transactions/:userid
     {
        "PhoneReceiver": "09034542789",
        "DeliveryAddress": "Tự Nhiên, Thường Tín, Hà Nội",
        "Message": "Giao buổi chiều"
     }
     */
    {
        method: 'POST',
        path: /^\/transactions\/([0-9a-z]+)/,
        handler: transactionController.confirmTransactionByUserID
    },

    /**
     * Xác nhận giao dịch với user chưa đăng nhập (sử dụng session)
     * /transactions
      {
        "PhoneReceiver": "09034542789",
        "DeliveryAddress": "Tự Nhiên, Thường Tín, Hà Nội",
        "Message": "Giao buổi chiều"
        }
     */
    {
        method: 'POST',
        path: '/transactions',
        handler: transactionController.confirmTransactionBySession
    },
    /**
     * Cập nhật giao dịch ( áp dụng cho cả khách hàng đăng nhập và chưa đăng nhập)
     {
        "PhoneReceiver": "09034542789",
        "DeliveryAddress": "Tự Nhiên, Thường Tín, Hà Nội",
        "Message": "Giao buổi chiều",
        "TransactionStatus": 1
     }
     */
    {
        method: 'PUT',
        path: /^\/transactions\/([0-9a-z]+)/,
        handler: transactionController.updateTransactionByTransactionID
    }
]
module.exports = routes;