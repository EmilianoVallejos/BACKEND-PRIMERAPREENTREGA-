import express from 'express';
import userRouter from './routes/userRouter.js';
const app = express();
const ProductManager = require('./productManager');
const CartManager = require('./cartManager');

const productManager = new ProductManager('./src/products.json');
const cartManager = new CartManager('./src/cart.json');

app.use(express.json());
app.use('/api',userRouter);

        // Obtener el producto por su id
    const product = productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Agregar el producto al carrito
        cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Product added to cart successfully' });
// Iniciar el servidor
app.listen(8080, () => {
    console.log('Servidor escuchando en puerto 8080');
});