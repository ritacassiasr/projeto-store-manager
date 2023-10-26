const router = require('express').Router();
const productController = require('../controllers/productController');
const { validatedName } = require('../middlewares/validateProduct');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', validatedName, productController.create);

module.exports = router;