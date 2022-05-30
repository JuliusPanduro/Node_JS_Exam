import { Router } from "express";
const router = Router();

import { encryptPassword, comparePassword } from "../authentication/passwordHandler.js";

import jwt from "jsonwebtoken";

import { addNewUser, findUser } from "../database/userHandler.js";

import {authenticateToken} from "../authentication/authToken.js";

import cookie from "cookie";

router.get('/api/auth', authenticateToken, (req,res)=>{
    res.status(200).send("Welcome to the dashboard")

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
                console.log(newUser);
                res.status(201).send(newUser); //Dont send the new user, just for development purpose     
        } else {
                res.status(409).send("User does already exist");
        }
});

router.post('/api/login', async (req,res)=>{
        const user = await findUser(req.body.email);
        console.log(user);
        if(user != null){
          comparePassword(req.body.password,user.password).then(validPass =>{
                if(validPass === true){
                const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);    
                //res.setHeader('Set-Cookie',cookie.serialize('jwt',accessToken,{path : '/', httpOnly: true, secure: true}));
                //res.status(200);
                        res.status(200)
                        .send({
                        email:user.email,
                        name:user.name,
                        my_token: accessToken
                        });
                       // console.log(accessToken);
                }else{
                        res.status(401).send("Wrong Password")
                }}).catch((err)=> console.error(err));                
        }else{
                res.status(400).send("User does not exist")
        }

});
   
export default router


