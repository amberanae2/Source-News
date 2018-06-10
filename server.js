var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = 3000; 

var app =express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout:"main"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("views"));

mongoose.connect("mongodb://localhost/newsSourcedb");
/// dont forget to add your database here

app.listen(PORT, function() {
  console.log("app running on port" + PORT + "!");
});