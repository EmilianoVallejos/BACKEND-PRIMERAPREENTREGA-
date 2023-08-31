import { Router } from "express";
import { uploader } from "../middlewares/multer.js";

const router = Router();

router.get('/',(req,res)=> res.send ({}));

router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = productManager.getProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/carts/:cid/product/:pid', (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;

        const cart = cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        
        const product = productManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/products/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const fieldsToUpdate = req.body;

        // Validación de campos obligatorios para actualización
        if (!fieldsToUpdate.title && !fieldsToUpdate.description && !fieldsToUpdate.code && !fieldsToUpdate.price) {
            return res.status(400).json({ error: 'At least one field to update is required' });
        }

        productManager.updateProduct(productId, fieldsToUpdate);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/products/:pid', (req, res) => {
    try {
    const productId = parseInt(req.params.pid);
    productManager.deleteProduct(productId);
    res.json({ message: 'Product deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/carts', (req, res) => {
    try {
        const allCarts = cartManager.getAllCarts();
        res.json(allCarts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/carts', (req, res) => {
    try {
        const cart = { products: [] }; // Crear un objeto de carrito vacío
        const cartId = cartManager.addCart(cart); // Agregar el carrito a la gestión de carritos
        res.status(201).json({ message: 'Cart created successfully', cartId });
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/carts/:cid', (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const products = cartManager.getProductsInCart(cartId); // Obtener productos en el carrito
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/carts/:cid/product/:pid', (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;

        // Validación de cantidad no negativa y mayor que 0
        if (quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }

        // Obtener carrito por id
        const cart = cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

router.post ('/imagen', uploader.single('file'), (req, res) =>{
    res.send(req.file.path);
});

export default router;