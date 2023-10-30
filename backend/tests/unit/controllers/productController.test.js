const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const productModels = require('../../../src/models/productModels');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
const {
  allProducts,
  productId1,
  getById,
  createProduct,
  deleteFail,
} = require('../mocks/productsMock');

chai.use(sinonChai);

describe('Testando controller products', function () {
  it('pesquisando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getAll')
      .resolves({ status: 200, response: allProducts });

    await productController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });
  it('pesquisando um produto específico pelo id', async function () {
    sinon.stub(productService, 'getById').resolves(getById);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productId1);
  });
  it('criando um produto', async function () {
    sinon.stub(productService, 'create').resolves(createProduct);

    const req = {
      body: { name: 'Martelo de Thor' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productId1);
  });
  it('deletando produto com status 404', async function () {
    sinon.stub(productModels, 'deleteProduct').resolves(999);
    sinon.stub(productService, 'deleteProduct').resolves(deleteFail);
    const req = { params: { id: 5 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('testando a busca por produtos', async function () {
    const res = {};
    const req = {
      query: 'Nome',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'searchProduct')
      .resolves({ status: 200, response: [{ id: 1, name: 'Nome 2' }, { id: 2, name: 'Nome 1' }] });

    await productController.searchProduct(req, res);
  });
  afterEach(function () {
    sinon.restore();
  });
});
