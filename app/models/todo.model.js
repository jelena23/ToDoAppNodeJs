module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    description: {
      type: Sequelize.STRING,
    },
    dueD: {
      type: Sequelize.DATE,
    },
    dueT: {
      type: Sequelize.TIME,
    },
    complete: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Todo;
};
