import { Children, createContext, useReducer } from "react";

//all components will have access to the workoutsContext 
//as we have passed down App component as a child component
//to the context provider
export const WorkoutsContext=createContext()

export const workoutsReducer=(state, action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts:action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts:[action.payload, ...state.workouts]
            }
        default:
            return state
    }
}


 export const WorkoutsContextProvider=({children})=>{

    const [state, dispatch]=useReducer(workoutsReducer, {
        workouts:null
    })

  


    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>
{/* Whatever component the Provider wraps */}
            {children}

        </WorkoutsContext.Provider>
    )

}