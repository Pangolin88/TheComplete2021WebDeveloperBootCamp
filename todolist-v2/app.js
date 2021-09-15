//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const _ = require('lodash')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://nemo-admin:zaVFXHe1CkFGXkg8@cluster0.7qy3g.mongodb.net/todoList?retryWrites=true&w=majority')

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
const Item = mongoose.model('Item', itemsSchema)

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

const List = mongoose.model('List', listSchema)

app.get("/", function(req, res) {
  Item.find({}, function(err, items){
    if(err){
      console.log(err)
    }else{
      res.render("list", {listTitle: 'Today', newListItems: items});
    }
  })
});

app.post("/", function(req, res){
  const item = req.body.newItem
  const listTitle = req.body.list
  const newItem = new Item({
    name: item
  })
  if (listTitle === 'Today'){
    newItem.save()
    res.redirect('/')
  }else{
    List.findOne({name: listTitle}, function (err, list){
      if(!err){
        if (item){
          list.items.push(newItem)
          list.save()
          res.redirect('/' + listTitle)
        }
      }
    })
  }
});

app.post("/delete", function (req, res){
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if (listName === 'Today'){
    Item.findByIdAndRemove(checkedItemId, function (err){
      if (err){
        console.log(err)
      }else{
        res.redirect('/')
      }
    })
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, list){
      if (!err){
        res.redirect('/' + listName)
      }
    })
  }
})

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName)
  List.findOne({name: customListName}, function(err, list){
    if (!err){
      if (!list){
        const newList = new List ({
          name: customListName,
          items: []
        })
        newList.save()
        res.redirect('/' + customListName)
      }else{
        res.render('list', {listTitle: list.name, newListItems: list.items})
      }
    }
  })
})

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
