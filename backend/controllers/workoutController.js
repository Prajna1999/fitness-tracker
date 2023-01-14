const Workout = require("../models/workoutSchema.js");
const mongoose=require('mongoose');
//get all workouts
const getWorkouts=async(req,res)=>{
    //getting all the data from the db sorted by date and time.
    const workouts=await Workout.find({}).sort({createdAt:-1});
    //sending back the data to the frontend after
    //200 status code
    res.status(200).json(workouts)
}



//get a single workout

const  getSingleWorkout=async(req,res)=>{

    const {id}=req.params;

    //validate whether the document with the id exists in the db or not.
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Workout exist.'})
    }

    const workout=await Workout.findById(id);

    // if the id doesnot exist.

    if(!workout){
        return res.status(404).json({error:'No such content'})
    }

    //send to the frontend;
    return res.status(200).json(workout)

    

}



//create a new workout
const createWorkout=async(req,res)=>{
    const { title, load, reps } = req.body;

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
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }
    //asynchronously add doc to db
  
    try {
      const workout = await Workout.create({ title, load, reps });
  
      res.status(200).json(workout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}


//delete a workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout exists'});
    }

    //find the workout by the _id field in the document.
    const workout=await Workout.findOneAndDelete({_id: id})
    //validation
    if(!workout){
        return res.status(404).json({error:'Workout does not exist'})
    }

    res.status(200).json(workout)
}



//update a workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(200).json({error:'Workout not found'})
    }

    const workout=await Workout.findOneAndUpdate({_id: id}, {
        //spread the property ofthe updated request body
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error:'NoSuch Workout'})
    }

    return res.status(200).json(workout)
}





//export the controllers
module.exports={
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}