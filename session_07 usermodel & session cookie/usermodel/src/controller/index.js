"use strict"
const User = require("../model/index") 

module.exports = {

    list:async (req,res)=>{

        const data =await User.find()

        res.status(200).send({
            error:false,
            user:data,

        })
    },
    create : async (req,res)=>{
        
        const data =await User.create(req.body)

        res.status(200).send({
            error:false,
            data:req.body,
            user:data
            
        })

    },
    read:async (req,res)=>{
        
        const data =await User.findOne({ _id : req.params.userId})

        res.status(200).send({
            error:false,
            data:data,
        })

    },
    update:async (req,res)=>{

        const data = await User.updateOne({_id : req.params.userId},req.body,{runValidators:true})

        res.status(200).send({
            error:false,
            data : await User.findOne({ _id : req.params.userId}),
        })
    },

    delete:async (req,res)=>{

        const data =await User.findOne({ _id : req.params.userId})
        if(data){ 
            await User.deleteOne({ _id : req.params.userId})
            res.send({
                error:false,
                deleted_data : data
            })
           
        }else{
            res.send(
                "user not found"
            )
        }

    }
}