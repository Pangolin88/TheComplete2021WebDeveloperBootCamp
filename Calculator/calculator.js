const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function(req, res) {
    const num1 = Number(req.body.num1)
    const num2 = Number(req.body.num2)
    const result = num1 + num2
    res.send('The result is ' + result)
})

app.get('/bmi', function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post('/bmi', function (req, res) {
    const weight = parseFloat(req.body.weight)
    const height = parseFloat(req.body.height)
    const bmi = weight / (height * height)
    if (bmi < 18.5){
        res.send(bmi + ' => underweight')
    }else if (bmi >= 18.5 && bmi <= 24.9){
        res.send(bmi + ' => normal')
    }else{
        res.send(bmi + ' => overweight')
    }
})

app.listen(3000, function () {
    console.log('Server started on port 3000')
})