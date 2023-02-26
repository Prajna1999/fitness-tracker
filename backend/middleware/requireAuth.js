const jwt=require('jsonwebtoken')

const User=require('../models/userModels')


const requireAuth=async(req,res, next)=>{
    //verify authentication
    const {authorization}=req.headers;

    //check if authoriztion header exists

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }
        // 'Bearer dsjfhdsfhid.32453hduishfds.hfieuwfioe'
        //split the string by spaces
        //grab the token only
        const token=authorization.split(' ')[1]

        try{
            //SECRET TO VERIFY THE TOKEN
           const {_id}= jwt.verify(token, process.env.SECRET)
            //attaching the user property on top of the 
            //req object only the id of the document is required
           req.user= await User.findOne({_id}).select('_id')
           next()
        }catch(error){
            console.log(error)

            res.status(401).json({error:'Request Not Authorized'})
        }

    }
module.exports=requireAuth;