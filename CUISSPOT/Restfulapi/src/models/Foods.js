const mongoose = require("mongoose");
 // const validator = require("validator");


const foodSchema = new mongoose.Schema({
    mealName : {
        type: String,
        required : true,
        unique: true
    },
    mealImage: {
        type: String,
        required: true,
        unique: true
    },
    restName:{
        type: String,
        required: true,
        unique: true
    },
    restAddress:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})

const Food = new mongoose.model('Food', foodSchema);
module.exports= Food;