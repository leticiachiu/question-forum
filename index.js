const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

//database
connection
  .authenticate()
  .then(() => {
    console.log("Connection completed!");
  })
  .catch((msgError) => {
    console.log(msgError);
  });

//express using ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => {
  Question.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //could also be ASC
    ],
  }).then((questions) => {
    res.render("index", {
      questions: questions,
    });
  });
});

app.get("/new_question", (req, res) => {
  res.render("new_question");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/savequestion", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/question/:id", (req, res) => {
  var id = req.params.id;
  Question.findOne({
    where: { id: id },
  }).then((question) => {
    if (question != undefined) {
      //question found

      Answer.findAll({
        where: { questionId: question.id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("question", {
          question: question,
          answers: answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/answer", (req, res) => {
  var body = req.body.body;
  var questionId = req.body.question;
  Answer.create({
    body: body,
    questionId:questionId,
  }).then(() => {
    res.redirect("success");
  });
});

app.listen(8010, () => {
  console.log("App is running!");
});
