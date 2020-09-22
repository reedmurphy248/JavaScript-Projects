const express = require("express");

const app = express();

app.get("/", function(req, res){
    res.send("<h1>Hello World</h1>");
});

app.get("/contact", function(req, res){
    res.send("Contact me at reedmurphy248@gmail.com");
});

app.get("/about", function(req, res){
    res.send("My name is Reed");
})

app.get("/hobbies", function(req, res){
    res.send("I love hiking");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
