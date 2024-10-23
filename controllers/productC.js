const {
    createProduct,
    getAllProducts,
    getDataById,
    deleteProductData,
    updateProductData,
    searchProducts
    }=require('../services/productS')


exports.postProduct=async(req,res,next)=>{
    const{productId,productName,description,price}=req.body
    // console.log(req.body)
    
    try {
        console.log('--INCOMING DATA OF PRODUCT--')
        if(!req.file){
            return res.status(400).json({message:"NO Image Uploaded"})
        }
        const imageBase64=req.file.buffer.toString('base64')
        const productData=await createProduct(productId,productName,description,price,imageBase64)
        res.send({productData})
    } catch (err) {
        console.log("ERROR IN CONTROLLER PRODUCT",err)
        throw err
    }
}

exports.getProducts=async(req,res,next)=>{
    const page=parseInt(req.query.page)||1;
    const ITEMS_PER_PAGE=2;
    // console.log(page);
    try {
        console.log("FETCHING ALL PRODUCT DATA")
        const getProduct=await getAllProducts(page,ITEMS_PER_PAGE)//give page here
        // console.log(getProduct)
        res.status(200).send(getProduct);
        
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF GET PRODUCTS",err);
        res.status(500).json({message:"Internal Server Error"});
    }
};

exports.getProductById=async(req,res,next)=>{
    const prodId=req.params.productId
    console.log(prodId)
    try {
        const ProductById=await getDataById(prodId);
        if (ProductById.message) {
            return res.status(404).json(ProductById);
        }
        res.send(ProductById)
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF GET ALL PRODUCTS",err);
        // throw err
        res.status(500).json({message:"Internal Server Error"});
    }
}
exports.deleteProductById=async(req,res,next)=>{
    const prodId=req.params.productId
    // console.log(prodId)
    try {
        console.log('DELETING THE USER DATA')
        const deleteProduct=await deleteProductData(prodId)
        res.send(deleteProduct)
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF DELETE PRODUCT BY ID",err)
        throw err
    }
}
exports.postUpdateProduct=async(req,res,next)=>{
    const {productName,description,price}=req.body
    const prodId=req.params.productId
    console.log(prodId)
    try {
        console.log('UPDATING THE USER DATA')
        const updateProduct=await updateProductData(prodId,productName,description,price)
        res.send(updateProduct)
        
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF UPDATE PRODUCT BY ID",err)
    }
}

exports.getProductByseacrhing=async (req,res,next) => {
    const query=req.query.q || 'No result Found!!';
    // console.log(query)
    const filter={
        minPrice:req.query.minPrice,
        maxPrice:req.query.maxPrice
    }
    // console.log(filter)
    try {
        const searchProduct=await searchProducts(query,filter);
        res.json(searchProduct)
    } catch (err) {
        console.log('Error in getProducts:',err);
        res.status(500).json({err:"Internal Server Error"})
    }
}
