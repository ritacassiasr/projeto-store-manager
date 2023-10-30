const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.execute(query);
  console.log(products);
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

const deleteProduct = async (id) => {
  const [{ deletedProduct }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return deletedProduct;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [id, name]);
  return result ? result.affectedRows : result;
};

const searchProduct = async (name) => {
  const [product] = await connection.execute(`
  SELECT * FROM products WHERE name LIKE ?`, [`%${name}%`]);

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteProduct,
  update,
  searchProduct,
};
