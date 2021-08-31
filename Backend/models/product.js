const mongoose=require('mongoose')
const placeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports=mongoose.model("Place",placeSchema)