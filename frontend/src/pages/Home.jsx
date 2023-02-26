import  {useEffect} from 'react'
import{WorkoutDetails,WorkoutForm }  from '../components/index'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import { useAuthContext } from '../hooks/useAuthContext'



function Home() {
  const {workouts, dispatch}=useWorkoutsContext()
    const {user}=useAuthContext()
  //fire the function when the component first renders
    useEffect(()=>{
      const fetchWorkouts=async()=>{
        const response=await fetch('http://localhost:5001/api/workouts', {
          headers:{
            'Authorization':`Bearer ${user.token}`
          }
        })
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
      //fetch only if we have a value for the user
      //i.e the user is authorized to make a request
      if(user){

        fetchWorkouts()
      }
    }, [dispatch, user])


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