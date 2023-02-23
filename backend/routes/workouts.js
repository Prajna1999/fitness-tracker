const express=require('express')

const router=express.Router()


//fires the function when the client requests the path
// /api/workouts/ relative path
router.get('/', (req,res)=>{

    res.json({mssg:"GET All workouts"})
    // console.log("it works")
})
//GET a single workout
router.get('/:id', (req,res)=>{
    res.json({mssg:'GET a single workout'})
})

//create a single workout doc
router.post('/', (req,res)=>{
    res.json({mssg:'POST a single workout'})
})

//delete a single workout.
router.delete('/:id', (req,res)=>{
    res.json({mssg:'DELETE a single workout.'})
})

//update a single workout.
router.patch('/:id', (req,res)=>{
    res.json({mssg: 'UPDATE a single workout'})
})
//this fires when we make a request to
// /api/workouts/hello relative path.
// router.get('/test', (req,res)=>{
//     res.json({mssg:"This too"})
// })


module.exports=router;