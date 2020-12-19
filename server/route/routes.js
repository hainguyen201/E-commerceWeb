const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const orderController = require('../controllers/order.controller')
const catalogController = require('../controllers/catalog.controller')
const authController = require('../controllers/auth.controller')
const productOrderController = require('../controllers/productorders.controller')
const routes = [{
        method: 'GET',
        path: '/users',
        handler: userController.findAll
    },
    {
        method: 'PUT',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.updateUser
    },
    {
        method: 'POST',
        path: '/users',
        handler: userController.addUser
    },

    {
        method: 'DELETE',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.deleteUser
    },
    {
        method: 'POST',
        path: "/users/login",
        handler: userController.findByUserName
    },
    {
        method: 'POST',
        path: "/users/logout",
        handler: userController.logout
    },
    {

        method: 'GET',
        path: /\/products\/catalogs\/([0-9a-z]+)/,
        handler: productController.findProductByCatalogID
    },
    {
        method: 'GET',
        path: /\/products\/names\/([0-9a-z_]+)/,
        handler: productController.findProductByName
    },
    {
        method: 'GET',
        path: '/products',
        handler: productController.findAllProducts
    },
    {
        method: 'GET',
        path: /\/products\/([0-9a-z]+)/,
        handler: productController.findProductByID

    },

    {
        method: 'POST',
        path: '/products',
        handler: productController.addProductWithAuth
    },
    {
        method: 'PUT',
        path: /\/products\/([0-9a-z]+)/,
        handler: productController.updateProductWithAuth
    },
    {
        method: 'GET',
        path: /\/orders\/([0-9a-z]+)/,
        handler: orderController.getOrderByID
    },
    {
        method: 'PUT',
        path: /\/orders\/([0-9a-z]+)/,
        handler: orderController.updateOrder
    },
    {
        method: 'POST',
        path: '/orders',
        handler: orderController.addOrder
    },
    {
        method: 'DELETE',
        path: /\/orders\/([0-9a-z]+)/,
        handler: orderController.deleteOrder
    },
    {
        method: 'GET',
        path: /\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.getCatalogByID
    },
    {
        method: 'GET',
        path: '/catalogs',
        handler: catalogController.getAllCatalog
    },
    {
        method: 'PUT',
        path: /\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.updateCatalog
    },
    {
        method: 'POST',
        path: '/catalogs',
        handler: catalogController.addCatalog
    },
    {
        method: 'DELETE',
        path: /\/catalogs\/([0-9a-z]+)/,
        handler: catalogController.deleteCatalog
    },
    {
        method: 'GET',
        path: '/auth',
        handler: authController.UserAuth
    },
    {
        method: 'GET',
        path: /\/productorders\/([0-9a-z]+)/,
        handler: productOrderController.getProductByOrderID
    },
    /**
     * Cập nhật số lượng sản phẩm của đơn hàng
     * productorders/:orderid/:productid
     */
    {
        method: 'PUT',
        path: /\/productorders\/([0-9a-z]+)\/([0-9a-z]+)/,
        handler: productOrderController.updateProductOrderByOrderIDProductID
    },
    /**
     * Thêm sản phẩm vào giỏ hàng với khách hàng đã đăng ký
     * productorders/:userid
     */
    {
        method: 'POST',
        path: /\/productorders\/([0-9a-z]+)/,
        handler: productController.addProductOrder
    }
]
module.exports = routes;