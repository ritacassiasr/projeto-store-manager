const router = require('express').Router();
const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

module.exports = router;
