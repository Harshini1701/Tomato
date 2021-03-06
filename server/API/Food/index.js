import express  from "express";



import {FoodModel} from "../../database/allModels";
const Router = express.Router();
/*
Route     /r
Desc      get all Foods details based on particular restaurannt
Params    id
Access    PUBLIC
Method    GET
*/

Router.get("/r/:id", async(req,res) =>{
    try {
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id})

        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});


/*
Route     /r
Desc      get all Foods details based on particular category
Params    category
Access    PUBLIC
Method    GET
*/

Router.get("/r/:category", async(req,res) =>{
    try {
        const {category} = req.params;
        const foods = await FoodModel.find({category: {$regex:category,$options:"i"}})

        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});
