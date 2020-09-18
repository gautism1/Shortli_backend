const mongoose=require('mongoose')
const urlschema= new mongoose.Schema(
    {
         urlCode:String,
         longurl:String,
         shorturl:String,
         date:{
              type:Date,
              default:Date.now
         }
    }
);

module.exports=mongoose.model('url',urlschema)
 