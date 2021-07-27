const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

//Routers
const productsRouter = require('./routers/products');

const api = process.env.URL;

app.use(`${api}/products`, productsRouter)

mongoose.connect(process.env.Mongo_connection,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'E-shop'
})
.then(()=>{
    console.log('Database connected');
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server is runing http://localhost:3000');
})