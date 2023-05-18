const express = require('express');
const BP = require('body-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
const newsRoute = require('./routes/newsRoute');

const app = express()
const port = 3000;


app.use(helmet());
require("dotenv").config();
app.use(bodyParser.json());
app.use(BP.urlencoded({extended: true}));
app.use(logger('dev'));

app.get('/', (req,res) => {
    res.send('hlo world')
});

app.use('/api', newsRoute);

app.use('/user',require(`./api-user/user`));
app.use('/bcr',require(`./api-user/testbc`));

app.listen(port, ()=>{
    console.log(`server jalan http://localhost:${port}`)
});