const mongoose =
require("mongoose");

const userSchema =
new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    wishlist:[{

        title:String,

        price:String,

        image:String,

        url:String
    }]
},

{
    timestamps:true
});

module.exports =
mongoose.model(
    "User",
    userSchema
);