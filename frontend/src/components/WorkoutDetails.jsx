import {useWorkoutsContext} from "../hooks/useWorkoutsContext"

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNowStrict'

import { useAuthContext } from "../hooks/useAuthContext"

function WorkoutDetails({workout}) {

  //to grab the dispatch function from the useWorkoutContext
  const {dispatch}=useWorkoutsContext()

  const {user}=useAuthContext()
const handleClick=async()=>{
  if(!user){
    return;
  }

    const response=await fetch('http://localhost:5001/api/workouts/'+workout._id, {
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })

    const json=await response.json()

    //if response is ok then only delete the global state
    if(response.ok){
      console.log( json)
      dispatch({type:'DELETE_WORKOUT', payload:json})
    }else{
      console.log("fucker you messed up")
    }
}
  
  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load(kg): </strong> {workout.load}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <p> {formatDistanceToNow(new Date(workout.createdAt), {addSuffix:true})}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails