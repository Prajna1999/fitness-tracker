const express=require('express')

const requireAuth=require('../middleware/requireAuth')

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}=require("../controllers/workoutController")


const router=express.Router()


//fire the middleware function
//to protect all the workout routes
router.use(requireAuth)

//fires the function when the client requests the path
// /api/workouts/ relative path
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//create a single workout doc
router.post('/', createWorkout)
    


  


//delete a single workout.
router.delete('/:id', deleteWorkout)

//update a single workout.
router.patch('/:id',updateWorkout)
//this fires when we make a request to
// /api/workouts/hello relative path.
// router.get('/test', (req,res)=>{
//     res.json({mssg:"This too"})
// })


module.exports=router;