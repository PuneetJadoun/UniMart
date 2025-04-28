const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const jwt  = require('jsonwebtoken');
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const  { Server } =  require("socket.io");

const http = require('http');

const server = http.createServer(app);
const io =  new Server(server,{
  cors:{
    origin: '*'
  }
});

const Product = require('./Controllers/Product');
const Products = Product.Products;  

const User = require('./Controllers/User');
const Users = User.Users;


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage }) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.use(cors());


mongoose.connect('mongodb+srv://punitku624:puneet123@cluster0.qx17k.mongodb.net/myApp?retryWrites=true&w=majority&appName=Cluster0');



app.get('/', (req, res)=>{
    res.send('Hello');
})

app.get('/search', Product.search);

app.post('/like-product', User.ProductsToLike);

app.post('/dislike-product', User.ProductsToDisLike);

app.post('/add-product', upload.fields([{name: 'pimage'}, {name: 'pimage2'}]), Product.addProduct);

app.post('/edit-product', upload.fields([{name: 'pimage'}, {name: 'pimage2'}]), Product.editProduct);

app.get('/get-products', Product.getProducts);

app.post('/delete-product', Product.deleteProduct);

app.get('/get-product/:pId', Product.getProductsById);

app.post('/liked-products' , User.likedProducts);

app.post('/my-products', Product.myProducts);

app.get('/get-user/:uId', User.getuserById);

app.get('/my-profile/:userId', User.myprofileUserId);

app.post('/signup', User.signup);

app.post('/login', User.login);

let messages = [];

io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('sendMsg', (data)=>{
      messages.push(data);
      io.emit('getMsg', messages);
    })

   io.emit('getMsg', messages);
})


server.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
})
