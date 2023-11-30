const Receipe=require('./models/recipes');
const dotenv = require('dotenv');
const connectDB = require('./db');
const recipes=require('./data/output.json');
dotenv.config();

connectDB();
const insertRecipes = async ()=>{
    try{
        await Receipe.deleteMany();
        console.log("all recipes deleted");
        await Receipe.insertMany(recipes);
        console.log("all recipes inserted");
    }
    catch (err){
        console.log(err);
    }
    process.exit();
}

insertRecipes();