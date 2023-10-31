const router = require('express').Router();
const productController = require('../controllers/productController');
const { validatedName } = require('../middlewares/validateProduct');

router.get('/search', productController.searchProduct);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', validatedName, productController.create);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', validatedName, productController.update);

module.exports = router;
