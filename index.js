const express=require("express");
const app=express();
const axios=require("axios");
const bodyparser=require("body-parser");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.redirect("index.html");
});

app.get("/random",async (req,res)=>{
    try{
    const total=await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    const meal=total.data.meals[0];
    const ingredients=[];
    let count=0;
    for(let i=1;i<=20 && count<=10;i++){
        const ingredient=meal[`strIngredient${i}`];
        const measure=meal[`strMeasure${i}`];
        if(ingredient&& ingredient.trim()!=="")
           {
            ingredients.push(`${ingredient}-${measure}`);
            count++;
           } 
    }
    const first=ingredients.slice(0,5);
    const second=ingredients.slice(5,10);
    res.render("random.ejs",{
        name:meal.strMeal,
        area:meal.strArea,
        process:meal.strInstructions,
        img:meal.strMealThumb,
        first: first,
        second:second
    });
    
    }
    catch(error){
        res.send("error to retrieve meal");
    }
});
app.post("/name",async (req,res)=>{
    try{
        const name=req.body.dish;
        const total=await axios.get("https://www.themealdb.com/api/json/v1/1/search.php",{
          params : {
            s:name
          }
         });
         const meal=total.data.meals[0];
         const ingredients=[];
         let count=0;
         for(let i=1;i<=20 && count<=10;i++){
             const ingredient=meal[`strIngredient${i}`];
             const measure=meal[`strMeasure${i}`];
             if(ingredient&& ingredient.trim()!=="")
               {  ingredients.push(`${ingredient}-${measure}`);
                count++;}
         }
         const first=ingredients.slice(0,5);
         const second=ingredients.slice(5,10);
         res.render("random.ejs",{
             name:meal.strMeal,
             area:meal.strArea,
             process:meal.strInstructions,
             img:meal.strMealThumb,
             first: first,
             second:second
         });

    }
    catch(error){
        res.send("error to retrieve meal");
    }
});
app.post("/category",async (req,res)=>{
    try{
        const name=req.body.category;
        const total=await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?",{
          params : {
            c:name
          }
         });
         let len=total.data.meals.length;
         let ran=Math.floor(Math.random()*len);
         let index=total.data.meals[ran].idMeal;
         const id=await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?",{
            params:{
                i:index
            }
         });
         const meal=id.data.meals[0];
         const ingredients=[];
         let count=0;
         for(let i=1;i<=20 && count<=10;i++){
             const ingredient=meal[`strIngredient${i}`];
             const measure=meal[`strMeasure${i}`];
             if(ingredient&& ingredient.trim()!=="")
               {  ingredients.push(`${ingredient}-${measure}`);
                count++;}
         }
         const first=ingredients.slice(0,5);
         const second=ingredients.slice(5,10);
         res.render("random.ejs",{
             name:meal.strMeal,
             area:meal.strArea,
             process:meal.strInstructions,
             img:meal.strMealThumb,
             first: first,
             second:second
         });

    }
    catch(error){
        res.send("error to retrieve meal");
    }
});
app.listen(3000,()=>{console.log("running at 3000")});