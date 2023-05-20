const express = require('express');
const BP = require('body-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const newsRoute = require('./routes/newsRoute');
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
    res.send('hlo world')
});

app.use('/api', newsRoute);
app.use(require('./routes/user'));

// midellware
app.use(middleware.verifyToken);

app.get('/protek', (req, res) => {
    // Dapatkan informasi pengguna dari req.user
    const user = req.user;
    res.json({ message: 'Protected route', user, tets: "kamu keren" });
});

app.listen(port, ()=>{
    console.log(`server jalan http://localhost:${port}`)
});