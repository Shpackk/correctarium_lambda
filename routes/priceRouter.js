const { Router } = require('express')
const router = Router()
const priceController = require('../controllers/priceController')


router.get('/make-order', priceController.makeOrder)


module.exports = router