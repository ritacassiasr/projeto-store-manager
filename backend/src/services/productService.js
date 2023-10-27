const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return { status: 200, response: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  return { status: 200, data: product };
};

const create = async (newProduct) => {
  const productId = await productModel.create(newProduct);
  const product = await productModel.getById(productId);
  return { status: 201, data: product };
};

const update = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const productExist = await productModel.getById(id);
  if (productExist === undefined) {
    return { status: 404, response: { message: 'Product not found' } };
  }
  const result = await productModel.update(name, id);
  return result && { status: 200, response: { id: Number(id), name } };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};