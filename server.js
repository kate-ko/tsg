// Get dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const request = require('request')

// Get our API routes & Initialize Express
const api = require('./server/routes/api')
const app = express()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules'))) //you might not need this if you want to keep things simple

// Set our api routes
app.use('/', api)

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'main/index.html'))
// })

// Get port and store in Express
const port = process.env.PORT || '3000'
app.set('port', port)

// Create & run the server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`))


