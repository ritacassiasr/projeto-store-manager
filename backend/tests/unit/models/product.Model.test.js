const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/productModel');
const { productId } = require('../mocks/productMock');

describe('Testando models products', function () {
  // it('pesquisando todos os produtos', async function () {
  //   sinon.stub(connection, 'execute').resolves([allProducts]);

  //   const products = await productModels.getAll();

  //   expect(products).to.be.an('array');
  //   expect(products).to.be.deep.equal(allProducts);
  // });

  it('Pesquisando produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productId]]);

    const input = 1;
    const product = await productModels.getById(input);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productId);
  });
  afterEach(function () {
    sinon.restore();
  });
});
