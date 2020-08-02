 const express=require('express');
const router=express.Router();

const url=require( '../module/url')

// GET
//DESCRIPTION GOING TO LON/ORIGINAL url
router.get('/:code',async (req,res) =>
{
try {
    const urL=await url.findOne({urlcode:req.params.code
    });
    if(urL)
    {
        return res.redirect(urL.longurl);
    }
    else 
    {
        return res.status(404).json('hey men something wrong hre'); 
     }
}
catch(err)
{
    console.log('notice');
    console.error(err);
    res.status(500).json('server error');
}
}
);

module.exports=router;



