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
        method: 'GET',
        path: '/products',
        handler: productController.findAll
    }
]
module.exports = routes;