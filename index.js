const express = require("express");

const sequelize = require("./util/database");

const userModel = require("./models/userModel");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

//TEST ROUTE
app.get("/", (req, res, next) => {
  res.send("Hello World");
});

//CRUD ROUTES
app.use("/users", require("./routes/userRoute"));

//ERROR HANDLING
app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message;
  res.status(500).json({ message: message });
});

//SYNC DATABASE

sequelize
  .sync()
  .then((res) => {
    console.log("database connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
