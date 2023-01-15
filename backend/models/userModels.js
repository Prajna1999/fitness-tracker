const mongoose=require('mongoose')

const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
})
//static signup method
userSchema.statics.signup=async function(email, password){
    const exists=await this.findOne({email})

    if(exists){
        throw Error('Email already exist')
    }
    //mypassword+12312312 salt
    //mypassword432949324 salt diff


    const salt=await bcrypt.genSalt(10)

    const hash=await bcrypt.hash(password, salt)

    const user=await this.create({email, password:hash})

    return user;

}



module.exports=mongoose.model('User', userSchema)