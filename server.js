const express=require('express');

const app=express();

const connectdb =require('./config/db');

// Database connecting
connectdb();

app.use(express.json({extended : false}));
//defing routes
app.use('/',require('./routes/allurl.js'));
app.use('/', require('./routes/index.js'))



app.use('/', require('./routes/url.js'))


const port =5000;

app.listen(port,() => console.log(`running at port ${port}`))