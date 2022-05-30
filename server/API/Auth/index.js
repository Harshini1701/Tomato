//library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//models
import {UserModel} from "../../database/user";

const Router = express.Router();



/*
Route     /signup
Desc      register new user
Params    NONE
Access    PUBLIC
Method    POST
*/

Router.post("/signup",async(req,res)=>{
    try {

        //check if email exists
        await UserModel.findByEmailAndPhone(req.body.credentials);

        //save to Db
        const newUser = await UserModel.create(req.body.credentials);

        //token genereation
        const token = newUser.generateJwtToken();

        //return success
        return res.status(200).json({token,status:"success"});

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});


/*
Route     /signin
Desc      signin with email and password
Params    NONE
Access    PUBLIC
Method    POST
*/

Router.post("/signin",async(req,res)=>{
    try {

        //check if email exists
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);


        //token genereation
        const token = user.generateJwtToken();

        //return success
        return res.status(200).json({token,status:"success"});

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});

export default Router;