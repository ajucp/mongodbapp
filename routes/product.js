const express=require('express');
const routes=express.Router();

const productController=require('../controllers/productC');
const upload=require('../middleware/upload')


routes.post('/product',upload.single('image'),productController.postProduct);
routes.get('/products',productController.getProducts);
routes.get('/products/:productId',productController.getProductById);
routes.delete('/products/:productId/delete',productController.deleteProductById);
routes.patch('/products/:productId/edit-product',productController.postUpdateProduct);
routes.get('/product/search',productController.getProductByseacrhing)

module.exports=routes
