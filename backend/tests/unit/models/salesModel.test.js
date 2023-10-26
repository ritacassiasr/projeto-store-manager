const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModels = require('../../../src/models/salesModel');
const {
  allSales,
  findSaleById,
  resultOutput,
  createSale,
} = require('../mocks/salesMock');

describe('Testando models sales', function () {
  it('pesquisando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const sales = await salesModels.getAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(allSales);
  });

  it('Pesquisando sales por id', async function () {
    sinon.stub(connection, 'execute').resolves([findSaleById]);

    const input = 1;
    const sale = await salesModels.getById(input);

    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(findSaleById);
  });
  it('Criando sale', async function () {
    sinon.stub(connection, 'execute').resolves(resultOutput);
    const create = await salesModels.create(createSale);
    expect(create).to.equal(resultOutput[0].insertId);
  });
  afterEach(function () {
    sinon.restore();
  });
});