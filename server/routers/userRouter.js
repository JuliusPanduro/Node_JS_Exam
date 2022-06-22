import { Router } from "express";
const router = Router();

import { encryptPassword, comparePassword } from "../authentication/passwordHandler.js";
import jwt from "jsonwebtoken";
import { addNewUser, findUser } from "../database/userHandler.js";
import {authenticateToken} from "../authentication/authToken.js";

router.get('/api/auth', authenticateToken, (req,res)=>{
       const authUser= ({
        firstName : req.user.firstName,
        lastName : req.user.lastName,
        email : req.user.email,
        gender : req.user.gender
       });
    res.status(200).send(authUser)
});

router.post('/api/registeruser', async (req,res)=>{
        const newUser = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : await encryptPassword(req.body.password),
                gender : req.body.gender
        };
        const userExist = await findUser(newUser.email);  

        if(!userExist){
                await addNewUser(newUser);
                res.status(201).send("User Created");     
        } else {
                res.status(409).send("User does already exist");
        }
});

router.post('/api/login', async (req,res)=>{
        const user = await findUser(req.body.email);
        if(user != null){
          comparePassword(req.body.password,user.password).then(validPass =>{
                if(validPass === true){
                const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);    
                        res.status(200).send({email:user.email,firstname:user.firstName,lastName:user.lastName,my_token: accessToken});
                }else{
                        res.status(401).send("Wrong Password")
                }}).catch((err)=> console.error(err));                
        }else{
                res.status(400).send("User does not exist")
        }
});
   
export default router


