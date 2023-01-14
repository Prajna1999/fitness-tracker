import  {useEffect, useState} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'





function Home() {
  const {workouts,dispatch}=useWorkoutsContext();
    

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch(import.meta.env.VITE_APP_BASE_URL)
        const json = await response.json()
  
        if (response.ok) {
          //dispatch the full array of workouts to the FE
          dispatch({type:'SET_WORKOUTS', payload:json})
        }
      }
  
      fetchWorkouts()
    }, [dispatch])


  return (
    <div className='home'>
        <div className="workouts">
            {workouts&& workouts.map((workout)=>(
                //template. Normal Brackets.
                <WorkoutDetails key={workout._id} workout={workout} />
            ))}

            {/* <WorkoutDetails /> */}
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home