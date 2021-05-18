module.exports = (app) => {
  const tag = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new Tag
  router.post("/", tag.createTag);

  router.get("/all", tag.findAllTagsWithTodos);

  // Retrieve all Tags
  router.get("/", tag.findAllTags);

  // Delete a Tag with id
  router.delete("/:id", tag.deleteTag);

  router.get("/:id", tag.findOneTag);

  app.use("/api/tag", router);
};
