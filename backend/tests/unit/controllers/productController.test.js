const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const productController = require('../../../src/controllers/productController');
const productService = require('../../../src/services/productService');
const { allProducts, getById, productId } = require('../mocks/productMock');

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
    expect(res.json).to.have.been.calledWith(productId);
  });
  afterEach(function () {
    sinon.restore();
  });
});