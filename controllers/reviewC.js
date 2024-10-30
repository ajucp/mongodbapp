const {addOrUpdateReview,getReviewByAvgRating}=require('../services/reviewS')

exports.postReview=async(req,res,next)=>{
    try {
    const{productId,userId,rating,comment}=req.body;
    // console.log(productId,userId,rating,comment)
    if(!productId || !userId || !rating){
        return res.status(400).json({message:'missing required fields'})
    }
    if(rating <0||rating>5){
        return res.status(400).json({message:"rating must be between 1 to 5!!"})
    }

    const newReview=await addOrUpdateReview(productId,userId,rating,comment)
    
    res.status(201).json(newReview)
    } catch (err) {
        console.log("Error in adding Review Controller",err)
        res.status(500).json({ message: err.message });
    }

}

exports.getProductReview=async  (req,res,next)=> {
    try {
        const {productId}=req.params;
        if(!productId){
            return res.status(400).json({message:"PRODUCT ID is REQUIRED"})
        }
        const reviewsData =await getReviewByAvgRating(productId)
        console.log("rating",reviewsData)
        res.status(200).json(reviewsData)
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF GET PRODUCT REVIEW")
        throw err
    }
}