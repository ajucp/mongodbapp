const User=require('../models/userM')


const login=async(email,password)=>{
try {
    const user=new User();
    const chLogin = await user.checkLogIn(email, password);
    console.log(chLogin)
    // if (chLogin) {
    //     return chLogin
    // } else {
    //     return {"message": "auth deatils error"}
    // }
    
    if(!chLogin){
        throw new err('Authentication Failed')
    }
    const loggedInUser = new User(chLogin.Fname, chLogin.Lname, chLogin.email, chLogin.userId, chLogin.password);
    const token=loggedInUser.generateAccessJWT();
    // console.log(token)
    return{
        message:"login Successfully",
        user:chLogin,
        token:token
    };
    
} catch (err) {
    console.log('Error in loginUser Service',err);
    throw err;
}
};


module.exports={login};