const jwt=require('jsonwebtoken');
const bycrypt = require("bcryptjs");
const crypto=require('crypto');
const getDb=require('../util/database').getDb;
const {SECRET_ACCESS_TOKEN}=require('../config/index');

const cipherKey="12345678910111213141516171819202"
// console.log(cipherKey)
const iv = "abcdefghijklmnop"

const Roles=Object.freeze({
    USER:'user',
    ADMIN:'admin',
    OWNER:'owner'
})

module.exports=class User {
    constructor(Fname, Lname, email,userId,password,role=Roles.USER) {
      this.Fname = Fname;
      this.Lname = Lname;
      this.email = email;
      this.userId=userId;
      this.password=password;
      this.role=role;
      this.createdAt=new Date();
      this.updatedAt=new Date();
    }


    async save(){
        
        const db=getDb();
        try {
            console.log('model page')
            // console.log('data inserted',this)
            this.createdAt=new Date()
            this.updatedAt=new Date()
            const result=await db.collection('users').insertOne(this)
            // console.log(result)
            return result
            
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    
    async checkUser(userId,email){
        const db=getDb();
        try {
            const result=await db.collection('users').findOne({$or:[{"userId":parseInt(userId)},{"email":email}]})
            // console.log(result)
            return result
        } catch (err) {
            console.log('MODEL ERROR IN CHECKING USERS',err)
            throw err
        }
    }

    //encrypting plain text password
    async encryptPwd(plainTextPassword){
        const cipher=crypto.createCipheriv('aes-256-cbc',cipherKey,iv)
        console.log(cipher)
        let crypted=cipher.update(plainTextPassword,'utf-8','hex')
        crypted +=cipher.final('hex');
        console.log('encrypted password:',crypted)
        return { crypted, iv: iv.toString('hex') };
    }

    //decrypting plain text password
    async decryptPwd(encryptPwd,ivHex){
        // const iv = Buffer.from(ivHex, 'hex');
        const decipher=crypto.createDecipheriv('aes-256-cbc',cipherKey,iv)
        console.log(decipher)
        let decrypted=decipher.update(encryptPwd,'hex','utf-8');
        decrypted +=decipher.final('utf-8');
        console.log('decrypted password:',decrypted)
        return decrypted;
    }

    // async passwordHash(password){
    //     return (await bycrypt.hash(password, 12)).toString();
    // }

    // async comparePassword(userPass, existingPass){
    //     const comparepswd=await bycrypt.compare(userPass,existingPass)
    //     return comparepswd
    // }

    async checkLogIn(email,password){
        const db=getDb();
        try {
            // const pswdHash=await this.passwordHash(password);
            // console.log("passwor hashed:", pswdHash);
            const user=await db.collection('users').findOne({email:email});
            if(!user){
                console.log('user not found')
                return null
            }
            // const isMatch=await this.comparePassword(password,user.password)
            const decryptedPassword=await this.decryptPwd(password);
            console.log(decryptedPassword)
            if(user.password ==decryptedPassword){
                console.log('login successfully')
                return user;
            }
            else{
                console.log('invalid password')
                return null
            }
        } catch (err) {
            console.log('MODEL ERROR IN LOGIN USERS',err)
            throw err
        }
    }

    generateAccessJWT(){
        const payload={
            id:this.userId,
            role:this.role          //add the role in jwt
        }
        const a= jwt.sign(payload,SECRET_ACCESS_TOKEN,{expiresIn:'1hr'})
        // console.log(a)
        return a
    }

    static fetchUser(){
        const db=getDb();
        try {
            const getData=db.collection('users').find().toArray()
            return getData    
        } catch (error) {
            console.log("ERROR IN FETCH USER MODELS",err)
        }
    }

    static async findUserById(userId){
        const db=getDb();
        try {
            console.log('FETCHING USER BY ID')
            const fetchUser=await db.collection('users').findOne({"userId":parseInt(userId)})
            // console.log(fetchUser)
            return fetchUser
        } catch (err) {
            console.log("ERROR IN FETCH USER BY ID MODELS",err)
        }
    }
    static async delete(userId){
        try {
            const db=getDb();
            console.log('DELETEING THE USER')
            // const filterQuery={'userId':userId}
            const deleteUser=await db.collection('users').findOneAndDelete({"userId":parseInt(userId)})
            console.log(deleteUser)
            return deleteUser
            
        } catch (err) {
            console.log("ERROR IN DELETE USER BY ID MODELS",err)
        }
    }

    static async update(userId,Fname,Lname){
        const db=getDb();
        try {

            const filterQuery={'userId':parseInt(userId)}
            const setQuery={updatedAt: new Date()};         
            console.log('UPDATING THE USER')
            this.updatedAt=new Date()
            if(Fname){
                setQuery.Fname=Fname
            }
            if(Lname){
                setQuery.Lname=Lname
            }
            const updateUser=await db.collection('users').updateOne(filterQuery,{$set:setQuery})
            return updateUser
        } catch (err) {
            console.log("ERROR IN UPDATE USER BY ID MODELS",err)
        }
    }

}

module.exports.Roles=Roles;