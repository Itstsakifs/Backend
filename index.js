const express = require('express');
const BP = require('body-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const middleware = require('./middleware/auth');

const app =express()
const port = 3000;


app.use(helmet());
require("dotenv").config();
app.use(bodyParser.json());
app.use(BP.urlencoded({extended: false}));
app.use(logger('dev'));

app.get('/', (req,res) => {
    res.send('hlo world')
})


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