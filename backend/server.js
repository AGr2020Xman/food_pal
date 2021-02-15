const express = require("express");
const mongoose = require("mongoose");
// const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// routes
const authRoutes = require("./routes/auth");
const foodRoutes = require("./routes/foodapi");
const { db } = require("./models/Users");

const app = express();

const port = process.env.PORT || 7000;

// app.use(logger("dev"));
// app.use(compression());
// const PWD = process.env.DB_PASSWORD;
// const databaseUrl = `mongodb+srv://Andre2020:@primarycluster.o092b.mongodb.net/FoodPal`;

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection success"))
  .catch((err) => {
    console.error("Mongo connection error, ", err);
  });

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use("/api", authRoutes);
app.use("/api", foodRoutes);

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
