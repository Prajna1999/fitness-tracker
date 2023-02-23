const Workout=require('../models/workoutSchema')
const mongoose=require('mongoose')
//get all workouts

const getWorkouts=async(req,res)=>{
    //grab all documents in reverse chronological order
    const workouts= await Workout.find({}).sort({createdAt:-1})

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

    try{
        const workout=await Workout.create({
            title, reps,load
        })

        res.status(200).json(workout)
    }catch(error){
        res.status(400). json({error: error.messgae})
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