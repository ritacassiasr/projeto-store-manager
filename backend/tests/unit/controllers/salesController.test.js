const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const {
  allSales,
  saleById,
  findSaleById,
} = require('../mocks/salesMock');

describe('Testando controller sales', function () {
  it('pesquisando todas as vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getAll')
      .resolves({ status: 200, response: allSales });

    await salesController.getAll(req, res);
  });
  it('pesquisando uma venda específica pelo id', async function () {
    sinon.stub(salesService, 'getById').resolves(findSaleById);

    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleById);
  });
  it('criando uma venda', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'create')
      .resolves({ status: 201, response: { id: 1, itemsSold: [...allSales] } });

    await salesController.create(req, res);
  });
  afterEach(function () {
    sinon.restore();
  });
});