const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const productModels = require('../../../src/models/productModels');
const productService = require('../../../src/services/productService');
const { productId1, allProducts } = require('../mocks/productsMock');

describe('Testando service products', function () {
  it('pesquisando produto', async function () {
    sinon.stub(productModels, 'getAll').resolves(allProducts);
    const products = await productService.getAll();

    expect(products.response).to.be.deep.equal(allProducts);
    expect(products.status).to.equal(200);
  });
  it('pesquisando um produto específico pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[productId1]]);

    const InsertId = 1;
    const products = await productService.getById(InsertId);

    expect(products.status).to.equal(200);
    expect(products.data).to.deep.equal(productId1);
  });
  it('pesquisando um produto específico não relacionado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const InsertId = 999;
    const products = await productService.getById(InsertId);

    expect(products.status).to.equal(404);
    expect(products.data.message).to.deep.equal('Product not found');
  });
  it('criando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([[productId1]]);

    const product = await productService.create('Martelo de Thor');

    expect(product.status).to.equal(201);
    expect(product.data).to.deep.equal(productId1);
  });
  it('delete produto com sucesso 204', async function () {
    sinon.stub(productModels, 'getById').resolves({ id: 1, name: 'Product 1' });
    sinon.stub(productModels, 'deleteProduct').resolves();

    const res = await productService.deleteProduct(1);

    expect(res).to.deep.equal({ status: 204, product: true });
  });
  it('delete produto undefined 404 ', async function () {
    sinon.stub(productModels, 'getById').resolves(false);
    const res = await productService.deleteProduct(999);

    expect(res.status).to.be.equal(404);
    expect(res.data).to.deep.equal('Product not found');
  });
  it('Busca produtos pelo nome', async function () {
    sinon
      .stub(productModels, 'searchProduct')
      .resolves([{ id: 1, name: 'Nome 2' }]);
    await productService.searchProduct('Nome');
  });
  // it('busca retorna vazio', async function () {
  //   sinon
  //     .stub(productModels, 'getAll')
  //     .resolves([{ id: 1, name: 'Nome 2' }, { id: 2, name: 'Nome 1' }]);
  //   await productService.searchProduct('');
  // });
  it('atualiza com valores válidos', async function () {
    sinon
      .stub(productModels, 'getById')
      .resolves({ id: 1, name: 'actual' });
    sinon
      .stub(productModels, 'update')
      .resolves({ affectedRows: 1 });
    await productService.update({ body: { name: 'new' }, params: { id: 1 } });
  });
  it('atualiza - erro, name não existe', async function () {
    sinon
      .stub(productModels, 'getById')
      .resolves(undefined);
    sinon
      .stub(productModels, 'update')
      .resolves({ affectedRows: 1 });

    await productService.update({ body: { name: 'new' }, params: { id: 1 } });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
