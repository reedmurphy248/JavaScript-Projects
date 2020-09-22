const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
    res.send("hello");
});

app.listen(8080, function(){
    console.log("Server started on port 8080");
});