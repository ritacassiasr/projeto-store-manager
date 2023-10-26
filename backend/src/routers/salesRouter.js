const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.post('/', salesController.create);

module.exports = router;
