const getDb=require('../util/database').getDb;

module.exports=class Review{
    constructor(productId,userId,rating,comment){
        this.productId=productId;
        this.userId=userId;
        this.rating=rating;
        this.comment=comment;
        this.createdAt=new Date();

    }
    // Check if the user already reviewed the product
    static async findReview(productId,userId){
        try {
            const db=getDb();
            const findForReview=await db.collection('reviews').findOne({
            productId:parseInt(productId),
            userId:parseInt(userId)
            });
        return findForReview
        } catch (err) {
            console.log("ERROR IN FIND_REVIEW MODEL")
            throw err
        }
        
    }

     // Create a new review
    async createReview(){
        console.log('---MODEL OF REVIEW---')
        const db=getDb();
        try {
            const result=await db.collection('reviews').insertOne(this)
            console.log("result",result)
            return this
        } catch (err) {
            console.log(err)
            throw new Error("ERROR IN CREATING REVIEW MODEL");
        }  
    }

    // Update an existing review
    static async updatedReview(productId,userId,rating,comment){
        const db=getDb();
        try {
                const updatedReview=await db.collection('reviews').updateOne({
                productId:parseInt(productId),
                userId:parseInt(userId),
            },
            {
                $set:{rating: parseInt(rating),comment,updatedAt:new Date()}
            },
        );
        // console.log(ReturnDocument);
        // console.log("Updted result",updatedReview)
        return updatedReview
        } catch (err) {
            console.log("ERROR IN MY UPDATED REVIEW MODEL",err)
        }
    }

    static async updateAverageRating(productId){
        const db=getDb();
        try {
            const avgRatingResult=await db.collection('reviews').aggregate([
                {$match:{productId:parseInt(productId)}},
                {$group:{_id:null,avgRating:{$avg:"$rating"}}}
            ]).toArray()
            console.log(avgRatingResult)
            const newAverageRating=avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : null;
            if(newAverageRating!==null){
                await db.collection("Product").updateOne(
                    {productId:parseInt(productId)},
                    {$set:{averageRating:newAverageRating}}
                );
            }
            else{
                await db.collection('Product').updateOne(
                    {productId:parseInt(productId)},
                    {$unset:{averageRating:''}}
                );
            }
        } catch (err) {
            console.error("Error in updating average rating", err);
            throw err
        }
    }

    static async getProductReviews(productId){
        const db=getDb();
        try {
            const reviews=await db.collection("reviews").find({productId:parseInt(productId)}).toArray();
            return reviews
        } catch (err) {
            console.log("ERROR IN FETCHING REVIEWS IN MODEL",err)
            throw err
        }
    }
    static async deleteReviewsById(productId){
        const db=getDb();
        try {
            const deleteReviews=await db.collection('reviews').deleteMany({productId:parseInt(productId)});
            return deleteReviews
        } catch (err) {
            throw err
        }
    }
}