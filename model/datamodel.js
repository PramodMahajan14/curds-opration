const mongoose = require("mongoose");
const schema = mongoose.Schema;


const dataschema = new mongoose.Schema({
   id:{
    type:Number, auto: true,default : function() {
        return Math.floor(Math.random()*900000000300000000000) + 1000000000000000
      }
   },
   name:{
       type:String,
       required:true
   },
   phone:{
       type:Number,
       required:true
   },
   email:{
       type:String,
       required:true
   },
   hobbies:{
       type:String,
       required:true
   }
  

});

module.exports = mongoose.model("InternData",dataschema)