const productModel = require('../models/productModel');

// Será validado que não é possível cadastrar uma venda sem o campo productId

const validateProductId = async (req, res, next) => {
  const sales = req.body;
  if (sales.some((e) => !e.productId || e.productId.length <= 0)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  const data = await Promise.all(
    sales.map(async (e) => {
      const { productId } = e;
      const dataPromise = await productModel.getById(productId);
      return !dataPromise ? null : dataPromise;
    }),
  );
  if (data.some((e) => e === null)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

// valindando 'quantity'

const saleQuantity = async (req, res, next) => {
  const [{ quantity }] = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (quantity <= 0) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProductId,
  saleQuantity,
};
