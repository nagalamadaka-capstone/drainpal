const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user");
const articlesRoute = require("./routes/articles");
const dataLogsRoute = require("./routes/datalogs");
const { NotFoundError } = require("./utils/error");

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.use("/users", userRoute);
app.use("/articles", articlesRoute);
app.use("/datalogs", dataLogsRoute);

app.get("/", (req, res) => {
  res.status(200).send({ ping: "pong" });
});

//404 error handler
app.use((req, res, next) => {
  const error = new NotFoundError("Not Found");
  error.status = 404;
  next(error);
});

//generic error handler
app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).send({
    error: {
      message: message || "Something went wrong in the application",
      status: status || 500,
    },
  });
});

module.exports = app;
