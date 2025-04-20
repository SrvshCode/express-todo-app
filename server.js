const express= require("express");
require("dotenv").config();
const todoRouter = require("./routes/todoRoutes");
const userRouter= require("./routes/userRoutes");
//const router = require("./routes/todoRoutes");
const errorHandler = require("./middlewares/errorhandler");
const connectDb = require("./config/dbConnection");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/todos",todoRouter);
app.use("/api/v1/users",userRouter)

connectDb();

app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`applciation is running on ${process.env.PORT}`);
})