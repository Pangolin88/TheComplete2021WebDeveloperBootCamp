//jshint esversion:6
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const encrypt = require('mongoose-encryption')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

mongoose.connect('mongodb+srv://nemo-admin:ISx77XB3X5VjdKLB@cluster0.7qy3g.mongodb.net/userDB?retryWrites=true&w=majority')

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: String
    }
})

const secret = 'ThisIsOurLittleSecret.'
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']})

const User = mongoose.model('User', userSchema)

app.get('/', function(req, res){
    res.render('home')
})

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/register', function(req, res){
    res.render('register')
})

app.post('/register', function(req, res){
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save(function(err){
        if(!err){
            res.render('secrets')
        }else{
            console.log(err)
        }
    })
})

app.post('/login', function(req, res){
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username}, function(err, foundUser){
        if (err){
            console.log(err)
        }else{
            if(foundUser){
                console.log('foundUser:', foundUser)
                if (foundUser.password === password){
                    res.render('secrets')
                }
            }
        }
    })
})

app.listen(3000, function() {
    console.log('Server is runing!!!')
})