const Review=require('../models/reviewM');
const Product=require('../models/productM');
const User=require('../models/userM')



const addOrUpdateReview=async(productId,userId,rating,comment)=>{
try {
    const newReviewOfProd=new Product(productId)
    const productExist=await newReviewOfProd.checkProductId(productId)
    // console.log("product",productExist)
    if(!productExist || productExist.length === 0){
        throw new Error('Product does not exist');
    }

    const newReviewOfUser=new User(userId)
    // console.log(newReviewOfUser);
    const userExist=await newReviewOfUser.checkUser(userId)
    // console.log(userExist)
    if(!userExist){
        throw new Error('User does not exist');
    }

    // Check if review already exists
    const existingReview=await Review.findReview(productId,userId);
    // console.log(existingReview);

    if(existingReview){
        const updatedReview=await Review.updatedReview(productId,userId,rating,comment);
        console.log(updatedReview)
        return {message:"Review Updated Successfully",updatedReview}
    }else{

        const review=new Review(productId,userId,rating,comment);
        const createReview=await review.createReview();
        await Review.updateAverageRating(productId);
        return {message:"Review Added Successfully",createReview}
    }
    } catch (err) {
        //console.log('Error in adding/updating review:', err.message)
        throw err
    }
    
}

const getReviewByAvgRating=async (productId) =>{
    console.log('hai')
    try {
        const reviews=await Review.getProductReviews(productId);
        if(reviews.length===0){
            return {averageRating:0,reviews:[]}
        }
        const totalRating=reviews.reduce((sum,reviews)=>sum+reviews.rating,0);
        const averageRating=totalRating/reviews.length;
        // console.log(averageRating)

        return {averageRating:averageRating,reviews}
        
    } catch (err) {
        console.log('Error in fetching product reviews:',err)
    }
   
}


module.exports={addOrUpdateReview,getReviewByAvgRating}