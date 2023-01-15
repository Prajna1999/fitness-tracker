const User=require('../models/userModels')
//login user
const loginUser=async(req,res)=>{
    res.json({mssg:'login user'})
}

//signup user
const signupUser=async(req,res)=>{

    const {email, password}=req.body

    try{
        const user=await User.signup(email, password)

        res.status(200).json({email, user})
    }catch(e){
        res.status(400).json({error:e.message})
    }

    res.json({mssg:'signup user'})
}

module.exports={signupUser,loginUser}