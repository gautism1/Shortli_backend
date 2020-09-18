const express=require('express');
const router=express.Router();
const urL=require( '../models/url');
// GET
//DESCRIPTION GOING TO LON/ORIGINAL url
router.get('/:code',async (req,res) =>
   {
    try 
    { 
           const url=await urL.findOne({urlCode:req.params.code});   
          if(url)
          { 
              let presentdate=new Date();         
              let checkdate=(presentdate-url.date)/(1000*60*60);
             if(checkdate>24)
                return res.json("Your Url is valid for 1 day ,Please try our one of our Preminum packa");
                else
                return res.redirect(url.longurl);
             }
              else 
            {
              return res.status(404).json('No such Url is present here that required for sorry');    
             }
    }
   catch(err)
       {
            console.log(err);
             res.status(500).json('server error');
        }
}
);
module.exports=router;
