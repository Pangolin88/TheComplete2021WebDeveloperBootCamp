//jshint esversion:6
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const { resolveSoa } = require('dns')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb+srv://nemo-admin:' + process.env.MONGO_PASSWORD + '@cluster0.7qy3g.mongodb.net/userDB?retryWrites=true&w=majority')

const userSchema = new mongoose.Schema ({
    email: {
        type: String
    },
    password: {
        type: String
    }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', function(req, res){
    res.render('home')
})

app.get('/login', function(req, res){
    res.render('login')
})

app.get('/register', function(req, res){
    res.render('register')
})

app.get('/secrets', function(req, res){
    if (req.isAuthenticated()){
        res.render('secrets')
    }else{
        res.redirect('/login')
    }
})

app.get('/logout', function(req, res){
    req.logout()
    res.redirect('/')
})

app.post('/register', function(req, res){
    console.log('req: ', req.body)
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err)
            res.redirect('/secrets')
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets')
            })
        }
    })
})

app.post('/login', function(req, res){
    const user = new User({
        username: req.body.username,
        passport: req.body.password
    })

    req.login(user, function(err){
        if (err){
            console.log(err)
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets')
            })
        }
    })
})

app.listen(3000, function() {
    console.log('Server is runing!!!')
})