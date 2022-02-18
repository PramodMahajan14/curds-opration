const express = require('express')
const InternData = require('../model/datamodel')
const router = express.Router();
const Sendmail = require('./sendemail')


router.post('/post_data',async(req,res)=>{
          const{name,phone,email,hobbies} = req.body;
    try{
    
     if(!name || !phone  || !email || !hobbies ){
        return res.status(400).json({msg:"please fill the all field",statuscode:400});
     }
     const Newdata = new InternData({
        name,phone,email,hobbies
     });
       await Newdata.save()
            res.json({msg:"Your Data Added!"})
    }catch(err){
     return res.status(500).json({msg:err.message})
    }
});

router.get('/get_data',async(req,res)=>{
    try{
        const data = await InternData.find();
        // const user = await Users.find()
          res.json(data)
        
    }catch(err){
        return res.status(500).json({msg:err.message})

    }
})

router.post('/update_data',async(req,res)=>{
    try{
        const {email,phone,name,hobbies,new_email} =  req.body;
           
        await InternData.findOneAndUpdate({email:new_email}, {
            email,phone,name,hobbies
        })
        res.status(200).json({msg: "Updated Successfully!"})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

router.post('/delete_data',async(req,res)=>{
    try{ const{new_email} =req.body; 
        
       await InternData.findOneAndDelete({email:new_email})
       res.status(200).json({msg: "Updated Successfully!"})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})

router.post('/send_mail',async(req,res)=>{
    try{   const{new_email} = req.body;
 
            const response = await InternData.findOne({email:new_email})
           await Sendmail(new_email,response.name,response.id)
         
            res.status(200).json({msg: "Updated Successfully!"})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})



module.exports = router;