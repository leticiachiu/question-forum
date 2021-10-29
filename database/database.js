const Sequelize = require("sequelize");
const connection = new Sequelize("questionforum", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
