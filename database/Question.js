const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define("questions", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}); //define the table name

Question.sync({ force: false }).then(() => {
  console.log("table created successfully!");
});

module.exports = Question;
