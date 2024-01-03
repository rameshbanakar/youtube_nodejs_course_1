const express=require("express")
const User=require("../Models/userModel")
exports.signupUser=async(req,res)=>{
    try {
        let newUser = req.body;
        let user=new User(newUser)
        await user.save()
        res.send({
            status:"success",
            data:newUser
        })
    } catch (error) {
        res.send({
            message:error.message
        })
    }
}