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

module.exports = {
  getAll,
  getById,
};