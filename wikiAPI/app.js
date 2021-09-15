const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect('mongodb+srv://nemo-admin:zaVFXHe1CkFGXkg8@cluster0.7qy3g.mongodb.net/wiki?retryWrites=true&w=majority')

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model('Article', articleSchema)

app.route('/articles')
    .get(function (req, res){
        Article.find({}, function(err, allArticles){
            if (err){
                res.send(err)
            }else{
                res.send(allArticles)
            }
        })
    })
    .post(function(req, res){
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })
        newArticle.save(function(err){
            if(err){
                res.send(err)
            }else{
                res.send({message: 'Successfully created new article.'})
            }
        })
    })
    .delete(function (req, res){
        Article.deleteMany({}, function (err){
            if(err){
                res.send({message: 'Successfully delete all articles.'})
            }else{
                res.send(err)
            }
        })
    })

app.route('/articles/:id')
    .get(function(req, res) {
        Article.findById(req.params.id, function (err, foundArticle) {
            if(err){
                res.send(err)
            }else{
                if(Article){
                    res.send(foundArticle)
                }else{
                    res.send({message: 'No articles found'})
                }
            }
        })
    })
    .put(function(req, res){
        Article.findOneAndUpdate(
                    req.params.id,
            {title: req.body.title, content: req.body.content},
            {overwrite: true},
            function (err){
                if(err){
                    res.send(err)
                }else{
                    res.send({message: 'Successfully updated article'})
                }
            }
        )
    })
    .patch(function(req, res){
        Article.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            function(err){
                if(err){
                    res.send(err)
                }else{
                    res.send({message: 'Successfully updated article'})
                }
            }
        )
    })
    .delete(function(req, res){
        Article.findByIdAndDelete(req.params.id, function(err){
            if(err){
                res.send(err)
            }else{
                res.send({message: 'Successfully deleted article'})
            }
        })
    })

app.listen(process.env.PORT || 3000, function(){
    console.log('Server has started successfully!')
})