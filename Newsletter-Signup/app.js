const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    
    var data = {
        members: [
            {
                email_address: email, 
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/4df8f964b8";

    const options = {
        method: "POST",
        auth: "reed1:f157db49b80e3da962d15f9854df9f70-us17"
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            newUserData = JSON.parse(data);
            console.log(newUserData);
        })
    })

    request.write(jsonData);
    request.end();
})



app.listen(8080, function(){
    console.log("Server is running on 8080");
})

// API Key
// f157db49b80e3da962d15f9854df9f70-us17

// List ID
// 4df8f964b8