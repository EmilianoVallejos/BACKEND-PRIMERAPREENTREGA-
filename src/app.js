import express from 'express';
import userRouter from './routes/userRouter.js';
const app = express();
const ProductManager = require('./productManager');
const CartManager = require('./cartManager');

const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/cart.json');

app.use(express.json());
app.use('/api',userRouter);


// Iniciar el servidor
app.listen(8080, () => {
    console.log('Servidor escuchando en puerto 8080');
});