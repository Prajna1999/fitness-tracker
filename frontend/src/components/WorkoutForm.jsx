import React, { useReducer, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  //dispatch function destructure.
  const { dispatch } = useWorkoutsContext();
  //reduce function
  const [workout, updateWorkout] = useReducer(
    (prev, next) => {
      const newWorkout = { ...prev, ...next };

      //Ensure that the length of the title is never more than 10chars.
      if (newWorkout.title.length > 40) {
        newWorkout.title = newWorkout.title.substring(0, 10);
      }
      return newWorkout;
    },

    //initial state
    { title: "", load: "", reps: "" }
  );

  const [error, setError] = useState(null);
  //create a state for empty fields array
  //to be populated if we got an error
  const [emptyFields, setEmptyFields]=useState([])

  //form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //  const workout={title, load, reps}

    //POST request to the server
    const response = await fetch(import.meta.env.VITE_APP_BASE_URL, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //after the POST request.
    const data = await response.json();
    //error handling
    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields)
    }
    //on success
    if (response.ok) {
      //add to the global context state
      //newly created workout
      //ONLY after the db registers a successful POST
      //requestand status code is 200
      setEmptyFields([])//not to see the errormessages on screen
      setError(null) //this line was missing
      console.log("new workout created", data);
      updateWorkout({title: '', load:'', reps:''})
     
      dispatch({ type: "CREATE_WORKOUT", payload: data });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>Excercise Title:</label>
      <input
        type="text"
        onChange={(e) => updateWorkout({ title: e.target.value })}
        value={workout.title}
        className={emptyFields.includes('title')?'error':''}
      />

      <label>Load(in kg):</label>
      <input
        type="number"
        onChange={(e) => updateWorkout({ load: e.target.value })}
        value={workout.load}
        className={emptyFields.includes('load')?'error':''}
      />

      <label>Reps: </label>
      <input
        type="number"
        onChange={(e) => updateWorkout({ reps: e.target.value })}
        value={workout.reps}
        className={emptyFields.includes('reps')?'error':''}
      />

      <button> Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
