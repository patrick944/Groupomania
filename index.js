const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const router = require("./routes/routes.js").router


const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

dotenv.config({ path: "./.env" });


// app.use('/' ,(req,res) =>{
//   console.log('j apprends le codage')
// })

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser()) 

app.use('/', require('./routes/routes'))
app.use('/auth', require ('./routes/auth'))

// Start the server
app.listen(3005, () => {
  console.log("Server running on port 3005");
});



