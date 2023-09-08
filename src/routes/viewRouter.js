import { Router } from "express";
import ProductManager from "../productManager.js";


const router = Router();
const ProductManager = new ProductManager ('/products.json')

router.get('/', async (req,res)=> {
    const products = await ProductManager.getProduct();
    res.render ('home', (products));
});
export default router;
