const express = require('express');
const router = express.Router();
const validurl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
let url = require('../models/url');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/shorten', async (req, res) => {

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
                   res.json(data);
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
 