import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    fullname:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String},
    address:[{detail: {type:String},for:{type:String}}],
    phoneNumber:{type:Number}
},{
    timestamps:true
});


UserSchema.methods.generateJwtToken = function(){
    return jwt.sign({user: this._id.toString()},"TOMATO");
};

 
UserSchema.statics.findByEmailAndPhone = async({email,phoneNumber}) =>{
    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone){
        throw new Error("user already exist");
    }

    return false;
};
UserSchema.pre("save",function(next){
    const user = this;


    if(!user.isModified("password")) return next();
    // to hash password we need to install bcrypt library from npm    
    bcrypt.genSalt(4,(error,salt)=>{
        if(error) return next(error);
        bcrypt.hash(user.password,salt,(error,hash)=>{
            if(error) return next(error);
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users",UserSchema);