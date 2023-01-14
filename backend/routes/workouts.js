const express = require("express");
const {createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout}=require("../controllers/workoutController");
const { update } = require("../models/workoutSchema");
const router = express.Router();


//attache a handler  to GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getSingleWorkout);

//POST a new workout.
router.post("/",createWorkout );

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout.
router.patch("/:id",updateWorkout);

module.exports = router;
