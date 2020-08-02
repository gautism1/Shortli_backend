const express=require('express');
const router=express.Router();
const validurl=require('valid-url');
const shortid=require('shortid');
const config=require('config');
const url=require('../module/url');
//@route  POST /api.url.shorten
//@desc  Create short url
router.post('./shorten', async (req,res) => 
{
    const {longurl} =req.body;
    const baseurl= config.get('baseurl');
console.log('gauti');
//check base url
    if(!validurl.isUri(baseurl))
    {
        return res.status(401).json('invalid base url');
    }

    //create short url
 const urlshort=shortid.generate();
  ///check for longurl
if(validurl.isUri(longurl))
{
    try{
let url =await url.findOne(  {longurl});

if(url)
{
    res.json(url);

}
else {
const shorturl=baseurl +urlcode;
url=new url({

    longurl,
    shorturl,
    urlcode,
    date:new date()
});


await url.save();
 res.json(url);
     }
    }
    catch(err){
     console.log(err);
     res.status(500).json('server error not running');
    }
}
 
 else {
     res.status(401).json('Url wss not appropriate')
 }
})

module.exports=router;