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

const app = express();

const port = process.env.PORT || 7000;

// app.use(logger("dev"));
// app.use(compression());
// const PWD = process.env.DB_PASSWORD;
// const databaseUrl = `mongodb+srv://Andre2020:@primarycluster.o092b.mongodb.net/FoodPal`;

// db connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/newfoodPal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
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
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../build")));
app.use("/api", authRoutes);
app.use("/api", foodRoutes);

app.get("/ping", (req, res) => {
  return res.send({
    error: false,
    message: "Server is healthy",
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build"));
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}!`);
});
