const allproducts = [
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

const productId = {
  id: 1,
  name: 'Martelo do Thor',
};

const getById = {
  status: 200,
  data: productId,
};

const createProduct = {
  status: 201,
  data: productId,
};

const newProduct = 9;

module.exports = {
  allproducts,
  productId,
  getById,
  createProduct,
  newProduct,
};
