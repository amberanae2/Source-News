const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  
  title: String,
 
  body: String
});


const Comments = mongoose.model("comments", CommentsSchema);

module.exports = Comments;
