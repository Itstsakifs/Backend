const express = require('express');
const BP = require('body-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/auth');

const app = express()
const port = 3000;

app.use(helmet());
require("dotenv").config();
app.use(express.static("public"));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(BP.urlencoded({extended: true}));
app.use(logger('dev'));

app.get('/', (req,res) => {
    res.send('hello world')
});

//unprotected routes
app.use(require('./routes/user'));//crud users
app.use(require('./routes/authRoute'))

//proteted routes
app.use(middleware.verifyToken);// midellware
app.get('/protek', (req, res) => {//get user loggin
    const user = req.user;
    res.json({ message: 'Protected route', user, tets: "kamu keren" });
});
app.use(require('./routes/newsRoute'));//news route

app.listen(port, ()=>{
    console.log(`server jalan http://localhost:${port}`)
});