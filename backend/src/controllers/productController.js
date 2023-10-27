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

const update = async (req, res) => {
  const { status, response } = await productService.update(req);
  res.status(status).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};