// const mongodb=require("mongodb");
const  getDb  = require("../util/database").getDb;

module.exports=class Product{
    constructor(productId,productName,description,price,image,rating){
        this.productId=parseInt(productId);
        this.productName=productName;
        this.description=description;
        this.price=parseInt(price);
        this.image=image;
        
    }

    async checkProductId(productId){
        const db=getDb();
        try {
            const result=db.collection('Product').find({'productId':parseInt(productId)}).toArray()
            return result
        } catch (err) {
            console.log("ERROR IS MODELS IN USERCHECKING",err)
        }
    }
    async save(){
        const db=getDb();
        try {
            const result=await db.collection('Product').insertOne(this)
            console.log(result)
            return this
            
        } catch (err) {
            console.log("ERROR IS MODELS IN SAVE METHOD",err)
        }
    }

    static async fetchAll(page,ITEMS_PER_PAGE){
        const db=getDb();
        try {
            const skip=(page-1)*ITEMS_PER_PAGE;
            // console.log(skip)
            // const result=await db.collection('Product').find().skip(skip).limit(ITEMS_PER_PAGE).toArray()//can pass page if we are giving the skip in controller
            // const result=await db.collection('Product').find().toArray()
            // console.log(result)
            const result=await db.collection('Product')
                        .aggregate([{
                            $lookup:{
                                from:'reviews',
                                localField:'productId',
                                foreignField:'productId',
                                as:'reviews'
                            }
                        },{
                            $addFields:{
                                averageRating:{
                                    $avg:"$reviews.rating"
                                }
                            }
                        },{
                            $project: { // Select only the desired fields
                                _id: 0,
                                productId: 1,
                                productName: 1,
                                description: 1,
                                price: 1,
                                averageRating: { $ifNull: ["$averageRating", 0] }
                            }
                        },{   $skip:skip},
                        { $limit:ITEMS_PER_PAGE }    
                    ]).toArray();
            return result
        } catch (err) {
            console.log("ERROR IS MODELS IN FETCH ALL",err)
        }
    }

    static async findProductById(prodId){
        const db=getDb();
        try {
            console.log('FETCHING USER BY ID')
            // const fetctProduct=await db.collection('Product').findOne({"productId":parseInt(prodId)})
            // console.log(fetctProduct)
            const fetctProduct=await db.collection('Product')
                        .aggregate([{
                            $match:{productId:parseInt(prodId)}
                        },{
                            $lookup:{
                                from:'reviews',
                                localField:'productId',
                                foreignField:'productId',
                                as:'reviews'
                            }
                        },{
                            $addFields:{
                                averageRating:{
                                    $avg:"$reviews.rating"
                                }
                            }
                        },{
                            $project: { // Select only the desired fields
                                _id: 0,
                                productId: 1,
                                productName: 1,
                                description: 1,
                                price: 1,
                                averageRating: { $ifNull: ["$averageRating", 0] }
                            }
                        }]).toArray();
            return fetctProduct
        } catch (err) {
            console.log("ERROR IN FETCH USER BY ID MODELS",err)
        }
    }

    static async delete(prodId){
        const db=getDb();
        try {
            console.log('DELETEING THE PRODUCT')
            const deleteProduct=await db.collection('Product').findOneAndDelete({"productId":parseInt(prodId)})
            return deleteProduct
        } catch (err) {
            console.log("ERROR IN DELETE USER BY ID MODELS",err)
        }
    }

    static async update(prodId,productName,description,price){
        const db=getDb();
        try {
            const filterQuery={"productId":parseInt(prodId)}
            const setQuery={};
            console.log('UPDATING THE PRODUCT')
            if(productName){
                setQuery.productName=productName
            }
            if(description){
                setQuery.description=description
            }
            if(price){
                setQuery.price=price
            }
            const updatedProduct=await db.collection('Product').updateOne(filterQuery,{$set:setQuery})
            return updatedProduct

        } catch (err) {
            console.log("ERROR IN UPDATE USER BY ID MODELS",err)
        }
    }

    static async searchAndFilter(query,filters) {
        const db=getDb();
        
            const searchquery={};
            if(query && query !== 'No result Found!!'){
                searchquery.$or=[
                    {productName:{$regex:query,$options:'i'}},
                    {description:{$regex:query,$options:'i'}}
                ];
            }
            
            if(filters.minPrice !== null){
                searchquery.price={ ...searchquery.price,$gte:parseInt(filters.minPrice)};
            }
            console.log('search query min price:',searchquery.price)
            if(filters.maxPrice !== null){
                searchquery.price={...searchquery.price,$lte:parseInt(filters.maxPrice)};
            }
            console.log('search query max price:',searchquery.price)
            if(filters.minRating !== null){
                searchquery.averageRating={...searchquery.averageRating,$gte:parseFloat(filters.minRating)};
            }
            console.log('search query min rating:',searchquery.averageRating)
            if(filters.maxRating !== null){
                searchquery.averageRating={...searchquery.averageRating,$lte:parseFloat(filters.maxRating)}
            }
            console.log('search query max rating:',searchquery.averageRating)
            console.log('search rating:',JSON.stringify(searchquery,null))
            try {
                // const searchqueryfilter=JSON.stringify(searchquery,null,2)
            const searchResult=await db.collection('Product').find(searchquery).toArray();
            console.log('search result:',searchResult)
            return searchResult;

            
        } catch (err) {
            console.log('Error searching products Models:',err)
            throw err;
        }
    }

}