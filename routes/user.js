const express=require('express');
const routes=express.Router();

const userController=require('../controllers/userC');
const validate=require('../middleware/validate');
// const {check,body}=require('express-validator');
const roleAuth=require('../middleware/role-auth');
const {Roles}=require('../models/userM');
const  Verify  = require('../middleware/verify').Verify;
const userValidator=require('../middleware/validator');



routes.post('/user',userValidator(),validate,userController.postUser);
routes.get('/users',Verify,roleAuth([Roles.ADMIN]),userController.getUser); 
routes.get('/user/:userId',userController.getUserById);
routes.delete('/user/:userId/delete',Verify,roleAuth([Roles.ADMIN]),userController.deleteUserById);
routes.patch('/user/:userId/edit-user',userController.postUpdateUser)



module.exports=routes;