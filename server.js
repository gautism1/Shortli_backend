const express=require('express');

const app=express();
var cors = require('cors');
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connectdb =require('./config/db');
// Database connecting
connectdb();

app.use(express.json({extended : false}));
//defing routes
 app.use('/', require('./routes/url.js'))
app.use('/',require('./routes/allurl.js'));
app.use('/', require('./routes/index.js'))



const port =5000 || process.env.PORT ;

app.listen(port,() => console.log(`running at port ${port}`))