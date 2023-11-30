const mongoose = require('mongoose');
const istTime=(5.5*60*60*1000);

const recipeSchema = mongoose.Schema({
    owner:{
        type:String,
        required:[true,'please fill the field']
    },
    recipename:{
        type:String,
        required:[true,'please fill the field']
    },
    ingredients:{
        type:String,
        required:[true,'please fill the field']
    },
    preptime:{
        type:Number,
        required:[true,'please fill the field']
    },
    cooktime:{
        type:Number,
        required:[true,'please fill the field']
    },
    totaltime:{
        type:Number,
        required:[true,'please fill the field']
    },
    cuisine:{
        type:String,
        required:[true,'please fill the field']
    },
    course:{
        type:String,
        required:[true,'please fill the field']
    },
    diet:{
        type:String,
        required:[true,'please fill the field']
    },
    instructions:{
        type:String,
        required:[true,'please fill the field']
    },
    image:{
        type:String,
        required:[true,'please fill the field']
    },
    addon:{
        type:Date,
        default:Date.now()+istTime
    },
    duration:{
        type:Number
    },
    comments:{
        type:String
    },
    likes:{
        type:Number
    }
});

const Recipe = new mongoose.model("Recipe",recipeSchema);

module.exports= Recipe;