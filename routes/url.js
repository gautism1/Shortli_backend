const express = require('express');
const router = express.Router();
const validurl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
let url = require('../module/url');
const bodyParser = require('body-parser');
//@route  POST /api.url.shorten
//@desc  Create short url
//const {urlSchema}=require(url);
router.use(bodyParser.urlencoded({
    extended: true
}));
router.post('/shorten', async (req, res) => {
    // console.log("asadjada",req.body);
    const {longurl} = req.body;   
    const baseurl = config.get('baseURL');       
        if (!validurl.isUri(baseurl)) {
           return res.status(401).json('invalid base url');
        }
    let urlCode = shortid.generate();
    //running uptill
    if (validurl.isUri(longurl)) {
        try {
          //  let Url = url.findOne({longurl});    
    url.findOne({longurl}).then((data)=>{ 
            if(data) {
                   res.json(data.shorturl);
            } 
            else{            
                 let shorturl = baseurl + urlCode;
                 newurl = new url({
                     longurl,
                     shorturl,
                     urlCode,
                     date: new Date()
                 });
                  newurl.save();
                 res.json(newurl);
//Yahan new data insert kara diaa
            }
    }).catch((err)=>{
        console.log("Eeeeeee error a gyi ", err);
    })
        }
        
         catch (err) {
            console.log(err);
            res.status(500).json('server error not running');
        }
    } else {
        res.status(401).json('Url wss not appropriate')
    }
});

module.exports = router;

//Yahan tak chal rha h lekin repeat ho raha here
// ab mujrnhi pata kese karna here
//blah blah