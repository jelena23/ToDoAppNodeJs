module.exports = (sequelize, Sequelize) => {
  const TodoTag = sequelize.define("todo_tag", {
    todoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Todo",
        key: "id",
      },
    },
    tagId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id",
      },
    },
  });
  return TodoTag;
};
