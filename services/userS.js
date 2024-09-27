const User=require('../models/userM')

const createUser=async(FName,LName,email,userId,password)=>{
    try {
        
        const newuserData=new User(FName,LName,email,userId,password);
        const userExistbyid=await newuserData.checkUser(userId,email);
        // const userExistbyemail=await newuserData.checkEmail(email);
        if(userExistbyid){
            return {'message':"userId or Email already exist or password enter is incorrect"}
        }else{
            //const pswdHash=await newuserData.passwordHash(password);
            //newuserData.password = pswdHash;
            
            //for encrypt and decrypt
            // const decryptedPassword=await newuserData.decryptPwd(password);
            // newuserData.password = decryptedPassword;
            const newUser=await newuserData.save()
            // console.log(newUser)
            return newUser
        }
    } catch (err) {
        console.log("ERROR IN SERVICE LAYER",err)
        throw err
    }
    
}
const getUser=()=>{
    try {
        console.log('---SERVICE LAYER---')
        const fetchAllUser=User.fetchUser()
        return fetchAllUser
    } catch (err) {
        console.log("ERROR IN SERVICE LAYER",err)
    }
    
}

const getUserId=async(userId,email)=>{
    try {
        console.log("FETCHING USER FROM SERVICE")
        const newgetUserData=new User(userId,email)
        // console.log(newgetUserData)
        const getUserData=await newgetUserData.checkUser(userId,email)
        // console.log(getUserData)
        if(getUserData){
            const user=await User.findUserById(userId);
            console.log(user)
            return user
        }
        else{
            console.log({"message":"user DOESNT exist"})
            return {"message":"user DOESNT exist"}
        }
        
    } catch (err) {
        console.log("ERROR FROM SERVICE GET_USER_ID",err)
    }
}
const deleteUserData=async(userId)=>{
    try {
        console.log('DELETING THE USER FROM SERVCICE')
        const deleteUser=await User.delete(userId)
        return deleteUser
        
    } catch (err) {
        console.log("ERROR FROM SERVICE DELETE USER",err)
    }
}

const updateUserData=async(userId,FName,LName)=>{
    try {
        console.log('UPDATING THE USER FROM SERVCICE')
        const updateUser=await User.update(userId,FName,LName)
        return updateUser
    } catch (err) {
        console.log("ERROR FROM SERVICE UPDATE USER",err)
    }
}

module.exports={createUser,getUser,getUserId,deleteUserData,updateUserData};