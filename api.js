var Db = require("./dbOperation");
const Bills = require("./bill");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;
const router = express.Router();
const dbOperation = require("./dbOperation");
app.use(express.json());

const logger = (req, res, next) => {
  // console.log("server console", `${req.method} ${req.originalUrl}`);
  next();
};

router.post("/createTableQuery", (req, response) => {
  dbOperation
    .getBills(req.body.query, req.body.name)
    .then((res) => {
      console.log(res);
      response.status(200).send(res);
    })
    .catch((err) => {
      console.log(err);
      response.status(404).send(err);
    });
});

router.post("/createDataQuery", (req, response) => {
  console.log('api js', req.body.query);
  dbOperation
    .dataCreation(req.body.query)
    .then((res) => {
      console.log("aaaaaa", res);
      response.status(200).send(res);
    })
    .catch((err) => {
      console.error("eRROR", err);
      response.status(404).send("query didnt Executed");
    });
});

app.use(logger);
app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
