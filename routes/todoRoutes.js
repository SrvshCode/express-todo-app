const express= require("express");
const { getTodos, updateTodo, deleteTodo, createTodo, getTodo } = require("../controllers/todoController");
const authenticateUser = require("../middlewares/authenticateUserHandler");
const router= express.Router();

router.route("/").get(authenticateUser,getTodos).post(authenticateUser,createTodo);

router.route("/:id").put(authenticateUser,updateTodo).delete(authenticateUser,deleteTodo).get(authenticateUser,getTodo);

module.exports=router;