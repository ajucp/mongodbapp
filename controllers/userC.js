const {createUser,getUser,getUserId,deleteUserData,updateUserData}=require('../services/userS')

exports.postUser=async(req,res,next)=>{
    try {
        console.log(req.body,"INCOMING DATA FROM POST MAN")
        const{FName,LName,email,userId,password,role}=req.body
        const userData=await createUser(FName,LName,email,userId,password,role);
        // console.log(userData)
        res.send({userData})
    } catch (err) {
        console.log("ERROR IN CONTROLLER",err)
        throw err
    }
}

exports.getUser=async(req,res,next)=>{
    try {
        console.log('FECHING ALL USER DETAILS')
        const getUserData=await getUser();
        res.send(getUserData)
    } catch (err) {
        console.log(err)
        throw err
    }
    
}

exports.getUserById=async(req,res,next)=>{
    const userId=req.params.userId
    try {
        console.log('FETCHING USER DETAILS BY ID')
        const userDetails=await getUserId(userId)
        res.send(userDetails)
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF GET_USER_BY_ID",err)
    }
}

exports.deleteUserById=async(req,res,next)=>{

    const userId=req.params.userId
    // console.log(userId)
    try {
        console.log('DELETING THE USER DATA')
        const deleteUser=await deleteUserData(userId)
        // console.log(deleteUser)
        res.send(deleteUser)
        
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF DELETE USER BY ID",err)
    }
}

exports.postUpdateUser=async(req,res,next)=>{
    const{FName,LName}=req.body
    const userId=req.params.userId
    console.log(userId)
    try {
        console.log('UPDATING THE USER DATA')
        const UpdateUser=await updateUserData(userId,FName,LName)
        res.send(UpdateUser)
    } catch (err) {
        console.log("ERROR IN CONTROLLER OF UPDATE USER BY ID",err)
    }
}