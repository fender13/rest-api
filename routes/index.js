const router = require('express').Router()
const controller = require('../controllers/userControllers')

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// post a user
router.post('/users', authentication, authorization, controller.createUser)

// get all user info 
router.get('/users', authentication, authorization, controller.findAll)

// get one user
router.get('/users/:id', authentication, controller.findOne)

// update one user
router.put('/users/:id', authentication, controller.updateUser)

// delete one user
router.delete('/users/:id', authentication, authorization, controller.deleteUser)

// signin a user
router.post('/signin', controller.userLogin)

// signup a user
router.post('/signup', controller.userSignUp)

module.exports = router