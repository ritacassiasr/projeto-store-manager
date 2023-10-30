const { expect } = require('chai');
const sinon = require('sinon');
// const productService = require('../../../src/services/productService');
// const productController = require('../../../src/controllers/productController');
const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/productModels');
const {
  allProducts,
  productId1,
  productId9,
  newProduct9,
} = require('../mocks/productsMock');

describe('Testando models products', function () {
  it('pesquisando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const products = await productModels.getAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(allProducts);
  });

  it('Pesquisando produtos por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productId1]]);

    const input = 1;
    const product = await productModels.getById(input);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productId1);
  });
  it('Criando produto', async function () {
    sinon.stub(connection, 'execute').resolves([productId9]);

    const input = { name: 'ProdutoX' };
    const product = await productModels.create(input);

    expect(product).to.be.an('number');
    expect(product).to.equal(newProduct9);
  });
  it('retorna dados do delete', async function () {
    const deletedProduct = { id: 1, name: 'Product 1' };
    sinon.stub(connection, 'execute').resolves([{ deletedProduct }]);
  
    const deleted = await productModels.deleteProduct(1);
  
    expect(deleted).to.deep.equal(deletedProduct);
  });
  it('busca por todos os produtos', async function () {
    sinon
      .stub(connection, 'execute')
      .resolves([[{}, {}]]);

    await productModels.searchProduct('Nome');
  });
  afterEach(function () {
    sinon.restore();
  });
});
