const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const { status, response } = await productService.getAll();
  return res.status(status).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.getById(Number(id));
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.create(name);
  return res.status(status).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, product } = await productService.deleteProduct(id);

  // if (product) return res.status(status).json();
  if (!product) return res.status(status).json({ message: data });
  return res.status(204).json();
};

const update = async (req, res) => {
  const { status, response } = await productService.update(req);
  res.status(status).json(response);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, response } = await productService.searchProduct(q);
  res.status(status).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteProduct,
  update,
  searchProduct,
};
