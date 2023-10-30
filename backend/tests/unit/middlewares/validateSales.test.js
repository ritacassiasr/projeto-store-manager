const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const {
  validateProductId,
  saleQuantity,
} = require('../../../src/middlewares/validateSale');

describe('Testando middlewares sale', function () {
  it('Ao terminar a verificação, o next é chamado', async function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const res = {};
    const next = sinon.stub().returns();

    validateProductId(req, res, next);
    saleQuantity(req, res, next);

    expect(next).to.have.been.calledWith();
  });
  it('testando sale sem o campo id do produto', async function () {
    const req = {
      body: [
        {
          quantity: 1,
        },
        {
          productId: 3,
          quantity: 10,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    validateProductId(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });
  });
  it('testando sale sem o campo quantity do produto', async function () {
    const req = {
      body: [
        {
          productId: 2,
        },
        {
          productId: 3,
          quantity: 10,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returnsThis();

    saleQuantity(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });
  });
});
