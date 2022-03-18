//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// var entries=[homeStartingContent];
// var entriesTitle=["Subh Aarambh"];
 var obj= {
   entries: homeStartingContent,
   entriesTitle: "Day 0"
 };
 var s1= _.truncate(homeStartingContent,{
   length: 100
 });
 var OBJ={
   entries: s1,
   entriesTitle: "Day 0"
 };
 var objEntry=[obj];
 var objEntry1=[OBJ];

app.get("/",function(req,res){
  // res.send("workss nub ;(");
  res.render("home",{objEntry1: objEntry1});
});


app.get("/contact",function(req,res){
  res.render("contact",{contactCon: contactContent});
});


app.get("/about",function(req,res){
  res.render("about",{aboutCon: aboutContent});
});


app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
  var entry1= req.body.newEntry;
  var entry2= req.body.newEntryTitle;
  // console.log(entry);
  var ss= _.truncate(entry1, {
    length: 100
  });
  var obj1={
    entries: entry1,
    entriesTitle: entry2
  };
  var obj2={
    entries: ss,
    entriesTitle: entry2
  };
  objEntry.push(obj1);
  objEntry1.push(obj2)
  res.redirect("/");
});


app.get("/post/:key",function(req,res){
  // console.log(req.params.key);
  var postIT=[];
  var s1= _.lowerCase(req.params.key);
  var f=-11;
  objEntry.forEach(function(obj){
    var s2= _.lowerCase(obj.entriesTitle);
    if(s1===s2)
    {
      res.render("post", {title: obj.entriesTitle, entry: obj.entries});
      // console.log(obj.entriesTitle);
      f=1;
    }
  });
  if(f===-11)
  {
    res.render("failure");
  }
});








app.listen(6969, function() {
  console.log("Server started on port 6969");
});
