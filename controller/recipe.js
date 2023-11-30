const Recipies = require('../models/recipes');
/*const Features=require('../utils/Features');*/

const GetAllRecipies = async(queryStr)=>{
    try {
        const {page,keyword} = queryStr;
        const skipCount =(page-1)*10;
        const query=keyword?{recipename:{$regex:keyword,$options:'i'}}:{};
        const recipes = await Recipies.find(query).skip(skipCount).limit(15);
        const totalRecipesCount = await Recipies.countDocuments({});
        const searchedDocumentCount = await Recipies.find(query).countDocuments({});
        let recipesCount = totalRecipesCount;
        if(searchedDocumentCount!==totalRecipesCount){
            recipesCount=searchedDocumentCount;
        }
        if(recipes){
            return {
                recipesCount:recipesCount,
                recipes:recipes,
            }
        }
        else{
            return "no recipes to show";
        }
    }
    catch(err){
        return err;
    }
    
}

const GetSingleRecipe =async (id)=>{
    try{
        const recipe = await Recipies.findById(id);
        if(recipe){
            return recipe;
        }
        else{
            return "no recipe found";
        }
    }
    catch(err){
        return "server busy"
    }
    

}

module.exports = {GetAllRecipies,GetSingleRecipe};