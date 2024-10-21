const Product = require("../models/productM");

const createProduct=async(productId,productName,description,price,imageBase64)=>{
    try {
        console.log("SERVICE PAGE")
        const newProduct=new Product(productId,productName,description,price,imageBase64)
        const productExist=await newProduct.checkProductId(productId)
        if (productExist.length>0){
            return {'message':"Product already exist"}
        }
        else{
            const product=await newProduct.save()
            return product
        }
    } catch (err) {
        console.log("ERROR IN PRODUCT SERVICE PAGE OF CREATE PRODUCT",err)
    }
}
const getAllProducts=async(page,ITEMS_PER_PAGE)=>{
    try {
        console.log("FETCHING ALL PRODUCT DETAILS IN SERVICE PAGE")
        const fetchAllProduct=await Product.fetchAll(page,ITEMS_PER_PAGE)
        // console.log(fetchAllProduct)
        return fetchAllProduct

    } catch (err) {
        console.log("ERROR IN PRODUCT SERVICE PAGE OF GET ALL PRODUCTS",err)
    }
}

const getDataById=async(prodId)=>{
    console.log("FETCHING THE PRODUCT DETAILS BY ID")
    try {
        const newgetproductbyId=new Product(prodId)
        const getProductById=await newgetproductbyId.checkProductId(prodId)
        if(getProductById.length>0){
            const product=await Product.findProductById(prodId)
            return product
        }
        else{
            console.log({"message":"Product DOESNT exist"})
            return {"message":"Product DOESNT exist"}
        }
    } catch (err) {
        console.log("ERROR IN PRODUCT SERVICE PAGE OF GET ALL PRODUCTS BY ID",err)
    }
}

const deleteProductData=async(prodId)=>{
    try {
        console.log('DELETING THE PRODUCT FROM SERVCICE')
        const deleteProduct=await Product.delete(prodId)
        return deleteProduct
        
    } catch (err) {
        console.log("ERROR FROM SERVICE DELETE PRODUCT",err)
    }
}
const updateProductData=async(prodId,productName,description,price)=>{
    try {
        console.log('UPDATING THE PRODUCT FROM SERVCICE')
        const updateProduct=await Product.update(prodId,productName,description,price)
        return updateProduct
    } catch (err) {
        console.log("ERROR FROM SERVICE UPDATING PRODUCT",err)
    }
    
}



module.exports=
{
    createProduct,
    getAllProducts,
    getDataById,
    deleteProductData,
    updateProductData
};