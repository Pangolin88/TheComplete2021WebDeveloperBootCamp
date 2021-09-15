const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fruitsDB')

// Create a new schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter fruit name']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

// Create model --> create a new collection
const Fruit = mongoose.model("Fruit", fruitSchema)

// Create a document
// const fruit = new Fruit({
//     rating: "9",
//     review: "Awesome fruit!!!"
// })

// save document
// fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)
const Person = mongoose.model("Person", personSchema)

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Yummy"
})

kiwi.save()

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favoriteFruit: pineapple
// })
//
// person.save()

//
// const kiwi = new Fruit({
//     name: 'kiwi',
//     rating: 8,
//     review: 'Great'
// })
//
// const banana = new Fruit({
//     name: 'banana',
//     rating: 7,
//     review: 'Pretty good'
// })

// Fruit.insertMany([kiwi, banana], function (err){
//     if (err) {
//         console.log('Something went wrong: ', err)
//     }else{
//         console.log('Successfully saved all the fruits')
//     }
// })

// Fruit.updateOne({name: 'banana'}, {rating: 5}, function (err){
//     if (err){
//         console.log('Something went wrong: ', err)
//     }else{
//         console.log('Updated successfully!')
//     }
// })

// Fruit.deleteOne({name: 'kiwi'}, function(err){
//     if (err){
//         console.log('Something went wrong: ', err)
//     }else{
//         console.log('Deleted successfully!')
//     }
// })
//
// Fruit.find(function(err, fruits) {
//     if (err) {
//         console.log('Something went wrong: ', err)
//     }else{
//         mongoose.connection.close()
//         fruits.forEach(function(fruit){
//             console.log(fruit.name)
//         })
//     }
// })

Person.updateOne({name: 'Nemo'}, {favoriteFruit: kiwi}, function(err) {
    if (err){
        console.log('Something went wrong: ', err)
    }else{
        console.log('Updated completed!!!')
    }
})

