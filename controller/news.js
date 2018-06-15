///routes folder 
var axios = require("axios");
var cheerio = require('cheerio');
var express = require("express");
var app = express.Router();

app.get("/", function(req,res) {
  res.render("index");
})

app.get("/articles"), function(req, res) {
 
  db.article.find({})
   .then(function(dbarticle) {
      
   res.json(dbarticle);

    })
    .catch(function(err) {
      
      res.json(err);

      });
    }

    app.get("/scrape", function(req,res) {
 
      axios.get("https://www.npr.org/").then(function(response){
              
        var $ = cheerio.load(response.data);
      
          $("article h3").each(function(i,element) {
            
        var result = {};
      
              result.title = $(this)
              .children("")
               .text();
              result.link = $(this)
               .children("")
               .attr("href");
      
               results.push({
                title: title,
                link: link
              });
            });
            
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

    app.get("articles/:id", function(req,res) {
      db.Comments.create(req,body)

      .then (function(dbcomment) {
        res.json(dbArticle)
      })
    });


    app.post("/articles/:id", function(req, res) {
      // Create a new note and pass the req.body to the entry
      db.Note.create(req.body)
        .then(function(dbNote) {
      
          res.json(dbArticle);
        })
      });


   exports = module.exports = app;

