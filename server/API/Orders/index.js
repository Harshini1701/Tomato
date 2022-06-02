import express  from "express";



import {OrderModel} from "../../database/allModels";
const Router = express.Router();
/*
Route     /
Desc      get all orders based on id
Params    _id
Access    PUBLIC
Method    GET
*/

Router. get("/:_id", async(req,res) =>{
    try {
        const {_id} =req.params;
        const getOrders = await OrderModel.findOne({user : _id});

        if(!getOrders){
            return res.status(404).json({error:"User Not Found"});
        }
        return res.status(200).json({orders:getOrders});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
});

/*
Route     /new
Desc      add new order
Params    _id
Access    PUBLIC
Method    POST
*/

Router.post("/new", async(req,res)=>{
    try {
        const {_id} = req.params;
        const {orderDetails} = rq.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push:{orderDetails}
            },
            {
                new:true
            }
        );
        return res.json({order:addNewOrder});
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})


export default Router;