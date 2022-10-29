const express = require ('express')
const mongoose = require ('mongoose')
require('dotenv').config()
const path = require('path');
const Article = require('../models/article')
const methodOverride = require('method-override')
const app = express()
const articleRouter = require('../routes/articles')
const port = process.env.PORT || 3000

var publicPath = path.resolve(__dirname, 'public');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public'));

// Ruta Principal Home
app.get('/', (req, res)=>{
    // const articles = await Article.find().sort({
    //     createdAt: "desc"
    // });
    // res.render('../views/index', {articles: articles})
    res.render('../views/index')
})



// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error(err));

app.use('/articles', articleRouter)


app.listen(port, 
    ()=> console.log(`Server escuchando en puerto ${port}`)
);