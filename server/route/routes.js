const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const orderController = require('../controllers/order.controller')
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
        method: 'GET',
        path: /\/products\/names\/([a-zA-Z0-9_]+)/,
        handler: productController.findProductByName

    },
    {
        method: 'GET',
        path: /\/products\/catalogs\/([0-9a-z]+)/,
        handler: productController.findProductByCatalogID
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
        handler: productController.addProduct
    },
    {
        method: 'PUT',
        path: /\/products\/([0-9a-z]+)/,
        handler: productController.updateProduct
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

]
module.exports = routes;