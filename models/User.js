const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        maxlength: 50
    },

    email: {
        type: String,
        trim : ture,
        unique: 1
    },

    password:{
        type: String,
        minlength: 5,
    },

    lastname: {
        type: String,
        maxlength: 50,
    },

    role: {
        type: Number,
        default: 0
    },

    image : string,
    
    token : {
        type: String
    },

    tokenExp: {
        type: Number
    }


});


module.exports = mongoose.model("User", userSchema);

