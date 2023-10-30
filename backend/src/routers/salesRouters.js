const router = require('express').Router();
const salesController = require('../controllers/salesController');
const {
  validateProductId,
  saleQuantity,
} = require('../middlewares/validateSale');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateProductId, saleQuantity, salesController.create);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
