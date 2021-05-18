module.exports = (app) => {
  const todo = require("../controllers/todo.controller.js");

  var router = require("express").Router();

  // Create a new Todo
  router.post("/", todo.createTodo);

  // Create a new Todo with Tags
  router.post("/create", todo.addTagToTodo);

  // Retrieve all completed Todos
  router.get("/complete", todo.findAllComplete);

  // Retrieve all uncompleted Todos
  router.get("/uncompleted", todo.findAllUncompleted);

  // Retrieve all Todos with tags
  router.get("/all", todo.findAllTodosWithTags);

  // Retrieve a single Todo with id
  router.get("/:id", todo.findOne);

  // Retrieve all Todos
  router.get("/", todo.findAllTodos);

  // Update a Todo with id
  router.put("/:id", todo.update);

  // Delete a Todo with id
  router.delete("/:id", todo.delete);

  // Delete all Todos
  router.delete("/", todo.deleteAll);

  app.use("/api/todo", router);
};
