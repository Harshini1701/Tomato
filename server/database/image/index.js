import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    images:[
        {
            location:{tyoe:String, required:true}
        }
    ]
},{
    timestamps:true
});

export const ImageModel = mongoose.model("Images",ImageSchema);