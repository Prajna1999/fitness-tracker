import  {useEffect, useState} from 'react'
import{WorkoutDetails,WorkoutForm }  from '../components/index'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'





function Home() {
  const [workouts, setWorkouts]=useState(null)
    
  //fire the function when the component first renders
    useEffect(()=>{
      const fetchWorkouts=async()=>{
        const response=await fetch('http://localhost:5001/api/workouts')
        //each object is a workout
        const json=await response.json()

        if(response.ok){
          //setstate of the worksouts
          setWorkouts(json)
        }
      }

      fetchWorkouts()
    }, [])


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