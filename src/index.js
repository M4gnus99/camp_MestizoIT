const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000;

//middleware

app.use(express.json());
app.use('/api', userRoutes);


//routes
app.get('/',(req, res)=>{
    res.send("Bienvenido a mi server levantado")
})


// Conexion MongoDB

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log('Conectado a MongoDB Atlas'))
    .catch((err) => console.error(err));


app.listen(port,()=>{
    console.log(`server listening on port: ${port}`);
})