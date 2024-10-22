const express=require('express');
const routes=express.Router();

const reviewController=require('../controllers/reviewC');

routes.post('/review',reviewController.postReview);
routes.get('/review/:productId',reviewController.getProductReview);

module.exports=routes;
