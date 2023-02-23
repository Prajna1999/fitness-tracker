import React, {useState} from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {

  const {dispatch}=useWorkoutsContext()


  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError]=useState(null)
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const workout={title, load, reps}

    //fetch api to send a POST request
    const response=await fetch('http://localhost:5001/api/workouts', {
      method:'POST',
      body:JSON.stringify(workout),
      headers:{
        'Content-Type':'application/json'
      }

    })
    //getting the JSOn back ans storing inside a function

    const json=await response.json()

    if(!response.ok){
        setError(json.error)
    }

    if(response.ok){
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      console.log('new Workout Added', json)

      // dispatch an action if the POST req is a success.
      dispatch({
        type:'CREATE_WORKOUT',

        payload:json
      })
    }
  }
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excercise Title:</label>

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>

      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>

      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
