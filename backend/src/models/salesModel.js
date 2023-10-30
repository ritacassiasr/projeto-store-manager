// const snakeize = require('snakeize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, 
    sp.quantity FROM sales_products AS sp 
    INNER JOIN sales AS s ON s.id = sp.sale_id 
    ORDER BY sp.sale_id, sp.product_id`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id , sp.product_id`,
    [id],
  );
  return result;
};

const create = async (arrSale) => {
  // obtendo a data/hora atual da venda e extraindo o 'insertId'
  const query1 = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query1);

  // formatando e criando os dados dos produtos de sale

  const promises = [];

  arrSale.forEach((sale) => {
    const query2 = `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`;
    const insertItem = connection.execute(query2, [insertId, sale.productId, sale.quantity]);
    promises.push(insertItem);
  });

  await Promise.all(promises);
  return insertId;
};

const deleteSale = async (id) => {
  const [{ deletedSale }] = await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteSale,
};
