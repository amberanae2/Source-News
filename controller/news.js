///routes folder 
var axios = require("axios");
var cheerio = require('cheerio');

var db = require ("./models");

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

    db.article.create(req.body)
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
