const Workout=require('../models/workoutSchema')
const mongoose=require('mongoose')
//get all workouts

const getWorkouts=async(req,res)=>{

    const user_id=req.user._id

    //grab all documents in reverse chronological order
    const workouts= await Workout.find({user_id}).sort({createdAt:-1})

    //sending back to the client as an array of objects
    res.status(200).json(workouts)
}


//get a single workouts
const getWorkout=async(req,res)=>{
    //grab the id property from req.params object
    const {id}=req.params

    //if it's not a valid id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout exists.'})
    }

    const workout= await Workout.findById(id)

    if(!workout){
        //return 
        return res.status(404).json({error:'No such workout'})

    }

    res.status(200).json(workout)

    // res.status(200).json({mssg:"Req successful"})

}

//create a new workout
const createWorkout=async(req,res)=>{

    const {title, reps, load}=req.body

    //error handling
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')

    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:"Please fill in all the fields", emptyFields})
    }

    //add doc to db.
    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}


//delete a workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout exists.'})
    }

    //delete the document
    const workout=await Workout.findOneAndDelete({_id:id})

    //check if we have a valid workout or not
    if(!workout){
        return res.status(404).json({error:"No Such Workout!"})
    }

    //send to the client
    res.status(200).json(workout)
}


//update a workout
    const updateWorkout=async(req,res)=>{
        const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout exists.'})
    }

    const workout=await Workout.findOneAndUpdate({_id:id}, {
        //whatever properties on the req. body 
        //will be updated
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:"No Such Workout Exists"})

    }

    //returns the docuemnts before updating
    //send back to the client in json data format.
    res.status(200).json(workout)
    }

// export
module.exports={
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}