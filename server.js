// require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const indexRoute = require('./routes/index.routes')
const commentRoute = require('./routes/comment.routes')

const blogModel = require('./models/blog.model')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))

app.use(indexRoute)
app.use(commentRoute)

require('dotenv').config();

// PORT ---------------------------------------------------
const PORT = process.env.PORT || 8000
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.8tyud.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    app.listen(PORT)
    console.log(`listening on ${PORT}`)
})
.catch(err => console.log(err))

