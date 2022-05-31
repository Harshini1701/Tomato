import express  from "express";



import {RestaurantModel} from "../../database/allModels";
const Router = express.Router();
/*
Route     /
Desc      get all restaurants details based on city
Params    NONE
Access    PUBLIC
Method    GET
*/

//here we url query

Router. get("/", async(req,res) =>{
    try {
        const {city} =req.query;
        const restaurants = await RestaurantModel.find({city});

        return res.json({restaurants});

    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

/*
Route     /
Desc      get individual restaurants details based on id
Params    NONE
Access    PUBLIC
Method    GET
*/

Router.get("/:id",async(req,res)=>{
    try {
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if(!restaurant){
            return res.status(404).json({error:"Restaurant not found"});
        }
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

/*
Route     /search
Desc      get individual restaurants details based on searched string
Params    NONE
Body      search string
Access    PUBLIC
Method    GET
*/

Router.get("/search", async(req,res) =>{
    try {
        const { searchString } = req.body;

        const restaurants = await RestaurantModel.find({name:{$regex:searchString, $options:"i"}});
        if(!restaurants){
            return res.status(404).json({error:`No Restaurants matched for ${searchString}`})
        }
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

export default Router;

 