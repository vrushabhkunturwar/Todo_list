const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

var app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/todo");

const todoSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", todoSchema); // Corrected to mongoose.model()

const todo1 = new Item({
    name: "Create some video"
});

const todo2 = new Item({
    name: "Learn DSA"
});

const todo3 = new Item({
    name: "Learn React"
});

const todo4 = new Item({
    name: "Take some rest"
});

// Save todos to the database
// todo1.save();
// todo2.save();
// todo3.save();
// todo4.save();

app.get('/', function(req, res) {
    Item.find({}, function(err, foundItems) {
        if (err) {
            console.log(err);
        } else {
            res.render("list", { dayej: foundItems });
        }
    });
});

app.post('/', function(req, res) {
    const itemName = req.body.ele1;
    const newItem = new Item({
        name: itemName
    });
    newItem.save();
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox1;
    Item.findByIdAndRemove(checkedItemId, function(err) {
        if (!err) {
            console.log("Deleted item with id: " + checkedItemId);
            res.redirect("/");
        }
    });
});

app.listen("4000", function() {
    console.log("Server started on port 4000");
});
