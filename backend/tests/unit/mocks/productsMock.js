const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const getAllProducts = {
  status: 200,
  data: allProducts,
};

const productId1 = {
  id: 1,
  name: 'Martelo de Thor',
};

const getById = {
  status: 200,
  data: productId1,
};

const productId9 = { insertId: 9 };
const newProduct9 = 9;

const createProduct = {
  status: 201,
  data: productId1,
};

const deleteFail = {
  status: 404,
  data: 'Product not found',
  product: false,
};

const deleteSucess = {
  status: 204,
  product: true,
};

module.exports = {
  allProducts,
  getAllProducts,
  productId1,
  getById,
  createProduct,
  productId9,
  newProduct9,
  deleteFail,
  deleteSucess,
};
