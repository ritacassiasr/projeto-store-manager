const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const middlewaresProduct = require('../../../src/middlewares/validateProduct');

describe('Testando middlewares product', function () {
  it('Ao terminar a verificação, o next é chamado', async function () {
    const req = {
      body: {
        name: 'Escudo do Capitão América',
      },
    };
    const res = {};
    const next = sinon.stub().returns();

    middlewaresProduct.validatedName(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  it('testando produto sem o campo name', async function () {
    const req = {
      body: {
        name: '',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    middlewaresProduct.validatedName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('testando produto com menos de cinco caracteres', async function () {
    const req = {
      body: {
        name: 'capa',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    middlewaresProduct.validatedName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });
  it('chamando next', async function () {
    const req = {
      body: {
        name: 'capa do doutor estranho',
      },
    };

    const res = {};
    const next = sinon.stub().returns();

    middlewaresProduct.validatedName(req, res, next);
    expect(next).to.have.been.calledWith();
  });
});
