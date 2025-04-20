const asyncHandler=require("express-async-handler");
const todoModel = require("../models/todoModel");
//@ desc get all todos
//@ GET method
//@ access private
const getTodos= asyncHandler(async(req,res)=>{
   const findTodos= await todoModel.find();
   console.log(findTodos);
   const filterTodosById= findTodos.filter(todo=>todo.user_id === req.user.id);
   console.log(filterTodosById);
   if(findTodos.length !==0 && filterTodosById.length !==0)
        res.status(200).json({filterTodosById});
    else{
        res.status(404);
        throw new Error("Todods are not available");
    }

});

//@ desc get a todo
//@ GET method
//@ access public
const getTodo= asyncHandler(async(req,res)=>{
    const id= req.params.id;
    const getTodo= await todoModel.findById(id);
    if(getTodo){
        if(getTodo.user_id.toString() === req.user.id){
            res.status(200).json({getTodo});
        }else{
            res.status(403);
            throw new Error("Users dont have premission to view other's todo details");
        }  
    }else {
        res.status(404);
        throw new Error(`todo with id: ${id} not available`)
    }
});

//@ desc create a todo
//@ POST method
//@ access public
const createTodo = asyncHandler(async(req,res)=>{
    const{title, description, isCompleted=false}=req.body;
    if(!title ||!description){
        res.status(400);
        throw new Error("Title and description of todo is mandatory!")
    }
    const createTodo= await todoModel.create({
        title,
        description,
        isCompleted,
        user_id:req.user.id
    });

    res.status(201).json({message:`todo Created Successfully with todo Id:${createTodo._id} and User Creator id:${createTodo.user_id}`});
});

//@ desc update a todo
//@ PUT method
//@ access public
const updateTodo= asyncHandler(async(req,res)=>{
    const id= req.params.id;
    const{title, description, isCompleted=false}=req.body;
    const getTodo= await todoModel.findById(id);
    if(getTodo.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have premission to view other's todo details");
    }

    const updateTodo= await todoModel.findByIdAndUpdate(
        id,
        {title, description, isCompleted},
        {new:true}
    );
    if(!updateTodo){
        res.status(404);
        throw new Error(`todo with id: ${id} not available`)
    }
    res.status(200).json({message:`Todo with id:${id} updated Successfully.Todo Details: ${updateTodo}`});
});

//@ desc delete a todo
//@ DELETE method
//@ access public
const deleteTodo= asyncHandler(async(req,res)=>{
    const id= req.params.id;
    const getTodo= await todoModel.findById(id);
    if(getTodo.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Users dont have premission to view other's todo details");
    }
    const deleteTodo= await todoModel.findByIdAndDelete(
        id
    );
    if(!deleteTodo){
        res.status(404);
        throw new Error(`todo with id: ${id} not available`)
    }
    res.status(200).json({message:`Todo with id:${id} deleted Successfully.Todo Details: ${deleteTodo}`});
});

module.exports={getTodos,getTodo,createTodo,updateTodo,deleteTodo}