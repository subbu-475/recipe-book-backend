const express = require('express');
const app=express();
const connectDB=require('./db')
const signInRoutes = require('./routes/signin');
const loginRoutes = require('./routes/login');
const recipiesRoute = require('./routes/recipies');
const cors = require('cors');
app.use(cors({origin:"*"}));
connectDB();

app.use(express.json())

app.use('/signin',signInRoutes);
app.use('/login',loginRoutes);
app.use('/recipies',recipiesRoute);

app.listen(process.env.port,()=>{
    console.log(`server running on the port ${process.env.port}`);
})
