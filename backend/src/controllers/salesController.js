const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { status, response } = await salesService.getAll();
  res.status(status).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getById(id);
  return res.status(status).json(data);
};

const create = async (req, res) => {
  const sale = req.body;
  const { status, response } = await salesService.create(sale);
  return res.status(status).json(response);
};

module.exports = {
  getAll,
  getById,
  create,
};