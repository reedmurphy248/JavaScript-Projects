const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    var num1 = parseInt(req.body.num1);
    var num2 = parseInt(req.body.num2);
    var newNumber = num1 + num2;

    res.send("The calculated number is " + newNumber);
});

app.get("/bmi", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmi", function(req, res){
    const weight = Number(req.body.weight);
    const height = Number(req.body.height);
    const bmi = weight / height**2;

    res.send(`Your BMI is ${bmi}`);
})

app.listen(3000, function(){
    console.log("Running on Port 3000")
});

