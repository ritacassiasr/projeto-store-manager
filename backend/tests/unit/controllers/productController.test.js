const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Testando controller produts', function () {
  it('relacionando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'getAll')
      .resolves({ status: 200, response: allproducts });

    await productController.getAll(req, res);

    expect(res.status).true.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });
});
