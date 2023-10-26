const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const saleModels = require('../../../src/models/salesModel');

const salesService = require('../../../src/services/salesService');
const { saleById, allSales } = require('../mocks/salesMock');

describe('Testando service sales', function () {
  it('pesquisando produto', async function () {
    sinon
      .stub(saleModels, 'getAll')
      .resolves(allSales);

    await salesService.getAll();
  });
  it('pesquisando uma venda específica pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const InsertId = 1;
    const sale = await salesService.getById(InsertId);

    expect(sale.status).to.equal(200);
    expect(sale.data).to.deep.equal(saleById);
  });
  afterEach(function () {
    sinon.restore();
  });
});