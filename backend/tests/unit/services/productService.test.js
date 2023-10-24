const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/productModel');
const productService = require('../../../src/services/productService');
const { allProducts, productId } = require('../mocks/productMock');

describe('Testando service products', function () {
  it('pesquisando produto', async function () {
    sinon.stub(productModels, 'getAll').resolves(allProducts);
    const products = await productService.getAll();

    expect(products.response).to.be.deep.equal(allProducts);
    expect(products.status).to.equal(200);
  });
  it('pesquisando um produto específico pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[productId]]);

    const InsertId = 1;
    const products = await productService.getById(InsertId);

    expect(products.status).to.equal(200);
    expect(products.data).to.deep.equal(productId);
  });
  afterEach(function () {
    sinon.restore();
  });
});