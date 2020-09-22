const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = new mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Learn React"
});

const item2 = new Item({
    name: "Do Laundry"
});

const item3 = new Item({
    name: "Get Job"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
    
    Item.find({}, function(err, foundItems){
        if (foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err);
                } else {
                    console.log("Inserted Successfully");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {listTitle: "Today", newListItems: foundItems});
        }
        
    });

});

app.post("/", function(req, res){

    const itemName = req.body.listItem;
    const listName = req.body.list

    const newItem = new Item({
        name: itemName
    });

    if (listName === "Today"){
        newItem.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/" + listName);
        })
    }

    
    
});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err){
            if (!err){
                console.log("Successfully Removed");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}},function(err, foundList){
            if (!err){
                res.redirect("/" + listName);
            }
        }
        );
    }

    

    
});

app.get("/:paramName", function(req, res){
    const listHeader = _.capitalize(req.params.paramName);

    List.findOne({ name: listHeader}, function(err, foundList){
        if (!err) {
            if (!foundList){
                // Create New List
                const list = new List({
                    name: listHeader,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + listHeader);
            } else {
                // Show Existing List
                res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
            }
        }
    });


    
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(8080, function(){
    console.log("Server started on port 8080");
});