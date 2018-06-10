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

mongoose.connect("mondodb://localhost/newsSourcedb");
/// dont forget to add your database here

app.get("/scrape", function(req,res) {
 
    axios.get("https://www.npr.org/").then(function(response){
        
      var $ = cheerio.load(response.data);

      $("article h3").each(function(i,element) {
      
        var result = {};

        result.title = $(this)
         .children("a")
         .text();
        result.link = $(this)
         .children("a")
         .attr("href");
      
         db.article.create(result)
          .then(function(dbarticle) {
            console.log(dbarticle);
          })
           .catch(function(err) {
             return res.json(err);
           });
          });  
          res.send("scrape complete");
        });
      });

      app.get("/articles"), function(req, res) {
 
        db.article.find({})
         .then(function(dbarticle) {
          
          res.json(dbarticle);

        })
        .catch(function(err) {
          
          res.json(err);

          });
        }

      app.get ("/articles/:id", function(req,res) {

        db.article.findone({ _id: req.params.id})

        .populate("comments")
        .then(function(dbarticle) {

          res.json(dbarticle);
        })
         .catch(function(err) {

          res.json(err);

       });
      });
   
       app.post("/articles/:id", function(req,res) {

        db.Comments.create(req.body)
         .then(function(dbcomments) {

           return db.article.findOneAndUpdate({_id: req.params.id}, { comments: dbcomments._id}, { new:true});
         })
         .then(function(dbarticle) {

          res.json(dbarticle);

         })
         .catch(function(err) {

          res.json(err);
         });
       });

       app.listen(PORT, function() {
         console.log("app running on port" + PORT + "!");
       });