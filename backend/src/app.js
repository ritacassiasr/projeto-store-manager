const express = require('express');
const { productRouters, salesRouters } = require('./routers');

const app = express();
app.use(express.json());

app.use('/products', productRouters);
app.use('/sales', salesRouters);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
