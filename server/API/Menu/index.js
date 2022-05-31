import express  from "express";



import {MenuModel,ImageModel} from "../../database/allModels";
const Router = express.Router();
/*
Route     /r
Desc      get all Menus details based on particular restaurannt
Params    _id
Access    PUBLIC
Method    GET
*/
Router.get("/list/:_id", async(req,res) => {
    try {
        const { _id} = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({menus});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});


/*
Route     /r
Desc      get all Menus images
Params    _id
Access    PUBLIC
Method    GET
*/
Router.get("/image/:_id", async(req,res) => {
    try {
        const { _id} = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.json({menus});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});