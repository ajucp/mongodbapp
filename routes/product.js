const express=require('express');
const routes=express.Router();

const productController=require('../controllers/productC')
routes.post('/product',productController.postProduct);

routes.get('/products',productController.getProducts);
routes.get('/products/:productId',productController.getProductById);
routes.delete('/products/:productId/delete',productController.deleteProductById);
routes.patch('/products/:productId/edit-product',productController.postUpdateProduct);

module.exports=routes
