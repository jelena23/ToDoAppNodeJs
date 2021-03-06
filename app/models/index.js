const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.todo = require("../models/todo.model.js")(sequelize, Sequelize);
db.tag = require("../models/tag.model.js")(sequelize, Sequelize);
db.todo_tag = require("../models/todo_tag.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.tag.belongsToMany(db.todo, {
  through: "todo_tag",
  foreignKey: "tagId",
  otherKey: "todoId",
});
db.todo.belongsToMany(db.tag, {
  through: "todo_tag",
  foreignKey: "todoId",
  otherKey: "tagId",
});

db.user.hasMany(db.todo, { as: "todo" });

db.todo.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.ROLES = ["user", "admin"];

module.exports = db;
