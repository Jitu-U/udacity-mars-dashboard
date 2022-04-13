require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls

//Importing controllers
const controllers = require('./controllers');


//Get Rover Details
app.get('/rovers/info/:name', controllers.getRoverDetails);

// Fetching images from NASA Apis
app.get('/rovers/images/:name', controllers.getRoverImages)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))