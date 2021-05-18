const { Op } = require("sequelize");
const db = require("../models");
const Tag = db.tag;
const Todo = db.todo;
const TodoTag = db.todo_tag;

exports.createTag = (req, res) => {
  const tag = req.body;

  return Tag.create({
    name: tag.name,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the Tag.",
      });
    });
};

exports.findAllTags = (req, res) => {
  Tag.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Tags.`,
      });
    });
};

exports.findAllTagsWithTodos = (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Todo,
        as: "todos",
        attributes: ["id", "description", "dueD", "dueT", "userId"],
        through: {
          model: TodoTag,
          as: "todoTags",
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Tags.`,
      });
    });
};

exports.deleteTag = (req, res) => {
  const id = req.params.id;

  Tag.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tag with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id,
      });
    });
};

exports.findOneTag = (req, res) => {
  const id = req.params.id;

  Tag.findByPk(id, {
    include: [
      {
        model: Todo,
        as: "todos",
        attributes: ["id", "description", "dueD", "dueT", "userId"],
        through: {
          model: TodoTag,
          as: "todoTags",
          attributes: [],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tag with id=" + id,
      });
    });
};
