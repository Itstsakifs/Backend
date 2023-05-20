//import modul
const express = require('express');
const BP = require('body-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/auth');

//import route
const newsRoute = require("./routes/newsRoute");

//inisial
const app = express();
const port = 3000;

//project setting
app.use(helmet());//keamanan aplikasi
require("dotenv").config();//konfigurasi
app.use(express.static("public"));//akses folder public
app.use(fileUpload());//gunakan modul file-upload bawaan express
app.use(bodyParser.json());//dep
app.use(BP.urlencoded({extended: true}));
app.use(logger('dev'));//dep

//tipu daya backend
app.get('/', (req,res) => {
    res.redirect("https://mercusuar.uzone.id/");
});

//unprotected routes
app.use(require('./routes/user'));//crud users
app.use(require('./routes/authRoute'))

//proteted routes
app.use(middleware.verifyToken);// midellware
app.get('/authuser', (req, res) => {//get user ter-autentifikasi
    const user = req.user;
    res.json({ message: 'Protected route', user, tets: "kamu keren" });
});
//app.use('/v1', newsRoute);//routes berita
app.use(newsRoute);//routes berita

app.listen(port, ()=>{
    console.log(`server jalan http://localhost:${port}`)
});
