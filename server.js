const express=require('express');
const path = require("path");

const app=express();
var cors = require('cors');
app.use(cors())

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
const connectdb =require('./config/db');
 
connectdb();

app.use(express.json({extended : false}));
//defing routes
 app.use('/', require('./routes/url.js'))
 app.use('/',require('./routes/allurl.js'));
 app.use('/', require('./routes/index.js'))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
const port =process.env.PORT || 5000   ;

app.listen(port,() => console.log(`running at port ${port}`))