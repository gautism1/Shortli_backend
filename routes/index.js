const express=require('express');
const router=express.Router();
const urL=require( '../module/url');
// GET
//DESCRIPTION GOING TO LON/ORIGINAL url

router.get('/:code',async (req,res) =>
{
try {
    const url=await urL.findOne(
          {
            urlCode:req.params.code
            }
        );

    //yahan tak run kar rha 

   // Agar url nhi aaega toh nuLL if m jaega
  /// console.log(url.date) ye bi error de rha h
    if(url)
    { 
        return res.redirect(url.shorturl);
    }

    // agar url null hoga otoh isme aaega
    else 
    {
        return res.status(404).json('No Url is present heresorry'); 
     }
 }
   catch(err)
   {
    ///agar error aaegi toh yahan aaega
     ;
    res.status(500).json('server error');
   }
}
);
module.exports=router;
