const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

//middleware
app.use(bodyparser.json());
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    Count: Number
})

const Product = mongoose.model('Product',productSchema);


const api = process.env.URL;
app.get(`${api}/products`,(req, res)=>{
    const product = {
        id: 1,
        name: 'hair',
        image: 'url',
    }
    res.send(product);
})

app.post(`${api}/products`,(req, res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        Count: req.body.Count
    })
    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

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