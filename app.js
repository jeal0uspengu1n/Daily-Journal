//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");
const fs = require('fs');

const homeStartingContent = "I need some more information about the services offered by Branch International";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const rawData = fs.readFileSync('data.json');
const dataArray = JSON.parse(rawData);
// console.log(dataArray[0]);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// creating the map and storing the user messages uniquely along with timestamps
map = new Map();
map.set(0, []);
map.get(0).push({
  TimestampUTC: "2017-02-01 19:21:58",
  MessageBody: "I need some more information about the services offered by Branch International!"
});
for(var i=0; i<dataArray.length; i++)
{
  if(map.get(dataArray[i].UserID) === undefined)
  {
    map.set(dataArray[i].UserID, []);
  }
  map.get(dataArray[i].UserID).push({
    TimestampUTC: dataArray[i].TimestampUTC, 
    MessageBody: dataArray[i].MessageBody
  });
}
// end of map thing

var obj= {
  entryMessage: map.get(0)[0].MessageBody,
  entryUserID: "User 0",
  entryTimestamp: map.get(0)[0].TimestampUTC
};
var s= _.truncate(map.get(0)[0].MessageBody,{
  length: 69
});
var OBJ={
  entryMessage: s,
  entryUserID: "User 0",
  entryTimestamp: map.get(0)[0].TimestampUTC
};
var objEntry=[obj];
var objEntry1=[OBJ];

app.get("/",function(req,res){
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
  var entryMessage= req.body.newEntry;
  var entryUserID= req.body.newEntryTitle;
  var entryTimestamp= "0000-00-00 00:00:00"
  // console.log(entry);
  var ss= _.truncate(entryMessage, {
    length: 69
  });
  var obj1={
    entryMessage: entryMessage,
    entryUserID: entryUserID,
    entryTimestamp: entryTimestamp
  };
  var obj2={
    entryMessage: ss,
    entryUserID: entryUserID,
    entryTimestamp: entryTimestamp
  };
  objEntry.push(obj1);
  objEntry1.push(obj2)
  res.redirect("/");
});


app.get("/post/:key",function(req,res){
  // console.log(req.params.key);
  var s1= _.lowerCase(req.params.key);
  var f=-11;
  objEntry.forEach(function(obj){
    var s2= _.lowerCase(obj.entryUserID);
    if(s1===s2)
    {
      res.render("post", {UserID: obj.entryUserID, MessageBody: obj.entryMessage, TimestampUTC: obj.entryTimestamp,});
      console.log(obj);
      f=1;
    }
  });
  if(f===-11)
  {
    res.render("failure");
  }
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
