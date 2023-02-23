const express=require('express')

const router=express.Router()


//fires the function when the client requests the path
// /api/workouts/ relative path
router.get('/', (req,res)=>{

    res.json({mssg:"It works"})
    // console.log("it works")
})

//this fires when we make a request to
// /api/workouts/hello relative path.
router.get('/test', (req,res)=>{
    res.json({mssg:"This too"})
})


module.exports=router;