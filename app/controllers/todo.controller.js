const { Op } = require("sequelize");
const db = require("../models");
const Todo = db.todo;
const Tag = db.tag;
const TodoTag = db.todo_tag;

exports.createTodo = async (req, res) => {
  const todo = req.body;

  return await Todo.create({
    description: todo.description,
    dueD: todo.dueD,
    dueT: todo.dueT,
    complete: todo.complete,
    userId: todo.userId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the Todo.",
      });
    });
};

exports.findAllTodos = async (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;

  await Todo.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Todos for user ID=" + ${userId}`,
      });
    });
};

exports.addTagToTodo = async (req, res) => {
  /// meca vejdjonjc
  const savedTodoTags = [];

  let savedTodo;

  try {
    savedTodo = await Todo.create(req.body);
  } catch (error) {
    return res.send(error);
  }

  req.body.tags.forEach(async function (item) {
    try {
      const tag = await Tag.findByPk(item.id);
      if (!tag.dataValues) {
        return res.status(400).send({
          message: "Error finding the tag.",
        });
      }
      const todoTag = {
        todoId: savedTodo.id,
        tagId: item.id,
      };

      const savedTodoTag = await TodoTag.create(todoTag);
      savedTodoTags.push(savedTodoTag);
    } catch (error) {
      return res.send(error);
    }

    return res.status(200).json(savedTodoTags);
  });

  /// ojdj meka vejdjonjc vejdjonjc

  // try {
  //   const savedTodo = await Todo.create(req.body);
  //   req.body.tags.forEach(async function (item) {
  //     const tag = await Tag.findByPk(item.id);

  //     if (!tag) {
  //       return res.status(400).send({
  //         message: "Error finding the tag.",
  //       });
  //     }

  //     const todoTag = {
  //       todoId: savedTodo.id,
  //       tagId: item.id,
  //     };

  //     const savedTodoTag = await TodoTag.create(todoTag);
  //     savedTodoTags.push(savedTodoTag);
  //   });
  // } catch (error) {
  //   console.error("FART! 🐶💨💨💨💨💨💨💨💨", error);
  // } finally {
  //   if (savedTodoTags.length > 0) {
  //     return res.status(200).json(savedTodoTags);
  //   }
  //   return res.send("Something went wrong.");
  // }
};

exports.findAllTodosWithTags = async (req, res) => {
  const userId = req.query.userId;
  var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;

  await Todo.findAll({
    where: condition,
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
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
      console.log("Error while retrieving Todos: ", err);
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  await Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
};

exports.updateCompleted = async (req, res) => {
  const id = req.params.id;

  await Todo.update(req.body.complete, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  await Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id,
      });
    });
};

exports.deleteAll = async (req, res) => {
  await Todo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Todos were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all todos.",
      });
    });
};

exports.findAllComplete = async (req, res) => {
  await Todo.findAll({ where: { complete: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

exports.findAllUncompleted = (req, res) => {
  Todo.findAll({ where: { complete: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};
