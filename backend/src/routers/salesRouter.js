const router = require('express').Router();
const salesController = require('../controllers/salesController');

const {
  validateProductId,
  saleQuantity,
} = require('../middlewares/validateSales');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', validateProductId, saleQuantity, salesController.create);

module.exports = router;
