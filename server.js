const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const{ pool } = require("./dbConfig");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
   res.render("index");
});

app.post("/", (req, res) => {
   let {tableName, firstNRows} = req.body;
   // console.log({tableName, firstNRows});
   pool.query(`SELECT * FROM ${tableName} LIMIT $1`,
               [firstNRows],
               (err, results) => {
                  if (err) {
                     throw err;
                  }
                  // console.log(results.rows);
                  const returnedRows = results.rows;
                  res.render("index", {returnedRows});
               })
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}` ));