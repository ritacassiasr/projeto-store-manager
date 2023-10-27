const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [[product]] = await connection.execute(query, [id]);
  return product;
};

const create = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [newProduct],
  );
  return insertId;
};

const update = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result ? result.affectedRows : result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};