import { Router } from "express";
import ProductManager from "../productManager.js";


const router = Router();
const ProductManager = new ProductManager ('/products.json')

router.get('/', async (req,res)=> {
    const products = await ProductManager.getProduct();
    res.render ('home', (products));
});

router.get('/realTimeProducts', async (req,res)=> {
    res.render ('realTimeProduct', {});
});


export default router;
