import { createContext, useReducer,useEffect } from "react";


export const AuthContext=createContext()

export const authReducer=(state, action)=>{
    switch (action.type){
        case 'LOGIN':
            return{ user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{

    //register the state

    const [state, dispatch]=useReducer(authReducer, {
        // Property for the user state
        user:null
    })
    //fire the auth context when first renders
    //just once
    //check for the token inthe localstrage only once

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))

        if(user){
            //dispatch a login action
            //only if the user exists
            dispatch({type:'LOGIN', payload:user})
        }
    }, [])

    //log the state when the state changes

    console.log('AuthContext state: ', state)

    //return the AurhContext Provider
    return (
        <AuthContext.Provider value={{...state, dispatch}}>

            {children}
        </AuthContext.Provider>
    )


}