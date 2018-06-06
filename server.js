var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require('cheerio');

var db = require ("./models");

var PORT = 3000; 

var app =express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout:"index"}));
app.set("view engine", "handlebars");

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("public"));

mongoose.connect("mondodb://localhost/");
/// dont forget to add your database here

app.get("/scrape", function(req,res) {
 
    axios.get("https://www.npr.org/").then(function(response){
        
      var $ = cheerio.load(response.data);

      $("article h2").each(function(i,element) {

      }
    );
})
})