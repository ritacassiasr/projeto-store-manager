const allSales = [
  {
    saleId: 1,
    date: '2023-08-31T22:39:31.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-08-31T22:39:31.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-08-31T22:39:31.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleById = [
  {
    id: 1,
    quantity: 5,
    date: '2023-08-24T16:34:55.000Z',
  },
];

const findSaleById = {
  status: 200,
  data: saleById,
};

const createSale = [
  {
    productId: 2,
    quantity: 1,
  },
  {
    productId: 3,
    quantity: 10,
  },
];

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 2,
      quantity: 1,
    },
    {
      productId: 3,
      quantity: 10,
    },
  ],
};

const saleStatus = {
  status: 201,
  data: {
    id: 3,
    itemsSold: [
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 10,
      },
    ],
  },
};

const resultOutput = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 3,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const updatedProduct = {
  id: 1,
  name: 'Martelo do Batman',
};

module.exports = {
  allSales,
  saleById,
  findSaleById,
  createSale,
  newSale,
  saleStatus,
  resultOutput,
  updatedProduct,
};
