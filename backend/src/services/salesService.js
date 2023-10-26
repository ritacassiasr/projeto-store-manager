const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 200, response: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) {
    return { status: 404, data: { message: 'Sale not found' } };
  }
  return { status: 200, data: sale };
};

module.exports = {
  getAll,
  getById,
};
