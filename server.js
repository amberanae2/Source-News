const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const db = require ("./models/index");


var PORT = 3000; 


///var exphbs = require("express-handlebars");

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsSourcedb");


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout:"main"}));

app.set("view engine", "handlebars");
//app.use('/', express.static('public'));

 var routes = require("./controller/news.js")

 app.use(routes);

/// dont forget to add your database here

app.listen(PORT, function() {
  console.log("app running on port" + PORT + "!");
});