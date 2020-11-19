const userController = require('../controllers/user.controller')

const routes = [
    {
        method: 'GET',
        path: '/user',
        handler: userController.findAll
    },
    {
        method: 'GET',
        path: /\/user\/([0-9a-z]+)/,
        handler: userController.findOne
    }
]
module.exports = routes;
