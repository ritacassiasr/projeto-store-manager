const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return { status: 200, response: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || sale.length === 0) { return { status: 404, data: { message: 'Sale not found' } }; }
  return { status: 200, data: sale };
};

const create = async (arrSale) => {
  const id = await salesModel.create(arrSale);
  return { status: 201, response: { id, itemsSold: [...arrSale] } };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);

  if (sale.length === 0) return { type: 'NOT_FOUND', message: 'Sale not found' };

  await salesModel.deleteSale(id);

  return { type: null };
};

module.exports = {
  getAll,
  getById,
  create,
  deleteSale,
};
