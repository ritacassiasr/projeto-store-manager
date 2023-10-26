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

module.exports = {
  getAll,
  getById,
};