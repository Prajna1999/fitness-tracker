const User=require('../models/userModels')
const jwt=require('jsonwebtoken')




//login user
const loginUser=async(req,res)=>{
    const {email, password}=req.body

    try{
        const user=await User.login(email, password)

        //create a token
        const token = jwt.sign({userId:user._id}, process.env.SECRET, {expiresIn:'3d'} )

        //send back to the client
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//signup user
const signUpUser=async(req,res)=>{
   
    const {email, password}=req.body

    try{
        const user=await User.signup(email, password)
        //create a token
        const token=jwt.sign({userId:user._id}, process.env.SECRET, {expiresIn:'3d'})
        
        // console.log(token)
        //pass the token back to the browser
        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}





module.exports={
    signUpUser,
    loginUser
}