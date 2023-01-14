import { Children, createContext, useReducer } from "react";

//all components will have access to the workoutsContext 
//as we have passed down App component as a child component
//to the context provider
export const WorkoutsContext=createContext()

export const workoutsReducer=(state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts:action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts:[action.payload,...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {

                //filter throught the current workout 
                //array and delete the id.
                workouts:state.workouts.filter((w)=>w._id!==action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider=({children})=>{

    const [state, dispatch]=useReducer(workoutsReducer,{
        workouts:null
    })

    // describes the state change
    // dispatch({type:'SET_WORKOUTS', payload:[{}, {}]})
    return (
        <WorkoutsContext.Provider value={{...state,dispatch}}>
            {/* putting the App inside the provider */}
            {children}
        </WorkoutsContext.Provider>
    )
}