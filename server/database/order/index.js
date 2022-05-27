import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Tyoes.ObjectId,
        ref:"Users"
    },
    orderDetails:[
        {
            food:{
                type:mongoose.Tyoes.ObjectId,
                ref:"Foods"
            },
            quantity: {type:Number, required:true},
            paymode:{type:String, required:true},
            status:{type:String, default:"Placed"},
            paymentDetails:{
                itemTotal:{type:Number, required:true},
                promo:{type:Number, required:true},
                tax:{type:Number, required:true},
            }
        }
    ],
},{
    timestamps:true
});


export const OrderModel = mongoose.model("Orders",orderSchema);