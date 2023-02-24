import  {useEffect} from 'react'
import{WorkoutDetails,WorkoutForm }  from '../components/index'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'





function Home() {
  const {workouts, dispatch}=useWorkoutsContext()
    
  //fire the function when the component first renders
    useEffect(()=>{
      const fetchWorkouts=async()=>{
        const response=await fetch('http://localhost:5001/api/workouts')
        //each object is a workout
        const json=await response.json()

        if(response.ok){
          //dispatch an action: SET_WORKOUTS
          //payload as the json data
          //fetched from the server
          dispatch({
            type:'SET_WORKOUTS',
            payload:json
          })
          
        }
      }

      fetchWorkouts()
    }, [dispatch])


  return (
    <div className='home'>
        <div className="workouts">
            {workouts && workouts.map((workout)=>(
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home