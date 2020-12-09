const userController = require('../controllers/user.controller')
const productController = require('../controllers/product.controller')
const routes = [{
        method: 'GET',
        path: '/users',
        handler: userController.findAll
    },
    {
        method: 'GET',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.findOne
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
        method: 'POST',
        path: '/users/login',
        handler: userController.findByUserName
    },
    {
        method: 'GET',
        path: '/products',
        handler: productController.findAll
    },
    {
        method: 'GET',
        path: /\/products\/([0-9a-z]+)/,
        handler: productController.findProductByCatalogID

    }
]
module.exports = routes;