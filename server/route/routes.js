const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
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
        path: '/products',
        handler: productController.findAllProducts
    },
    {
        method: 'GET',
        path: /\/products\/([0-9a-z]+)/,
        handler: productController.findProductByID

    },
    {
        method: 'GET',
        path: /\/products\/catalogs\/([0-9a-z]+)/,
        handler: productController.findProductByCatalogID
    },
    {
        method: 'POST',
        path: '/products',
        handler: productController.addProduct
    },
]
module.exports = routes;