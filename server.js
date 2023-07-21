// *Creating express server

// Require express library
const express = require('express')
// Set up the server
const app = express()
// Set view engine for rendering html files
app.set('view engine', 'ejs')

// For rendering static files
app.use(express.static("public"))
// Access info coming from forms
app.use(express.urlencoded({ extended: true }))
// Process JSON data coming
app.use(express.json())

// Set up routes 
app.get('/', (req, res) => 
{
    // render the html file in the views directory, and change the text variable
    res.render('index', { text: "express ile ben" })
})

// Sperated router
const userRouter = require('./routes/users')
app.use('/users', userRouter)

// Run the server
app.listen(8487)

