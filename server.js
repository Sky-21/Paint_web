const http = require('http')
const path = require('path')
const ejs = require('ejs')
const express = require('express')

const app = express()

const server = http.createServer(app)

const port = process.env.PORT || 8000

app.use(express.static(__dirname  + '/public'))

app.set('views', path.join(__dirname +'/public'))

app.engine('html', ejs.renderFile)

app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

server.listen(port , () => console.log(port))