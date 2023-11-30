const express = require('express');
const {GetAllRecipies,GetSingleRecipe} = require('../controller/recipe');
const app = express();
const route = express.Router();

route.route('/').get(async(req,res)=>{
    try{
        const getRecipies = await GetAllRecipies(req.query);
        res.status(200).json(getRecipies);
    }
    catch (err){

    }
})

route.route('/:id').get(async(req,res)=>{
    const id = req.params.id;
    const response=await GetSingleRecipe(id);
    if(response==="no recipe found"){
        res.status(200).send("no recipe found");
    }
    else if(response==="server busy"){
        res.status(500).send("server busy")
    }
    else{
        res.status(200).json(response);
    }
})


module.exports = route;