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

module.exports = {
  getAll,
  getById,
};