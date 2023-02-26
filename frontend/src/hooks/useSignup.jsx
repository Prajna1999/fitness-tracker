import { useContext , useState} from "react";

import {useAuthContext} from './useAuthContext'


export const useSingup=()=>{
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading]=useState(null)

    const {dispatch}=useAuthContext()

    const signup=async(email, password)=>{
        setIsLoading(true)

        setError(null)

        //make the POST req
        const response=await fetch('http://localhost:5001/api/user/signup', {
            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email, password})
        })

        const json=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save the token tothe local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload:json})

            //update the loading state
        }



    }

    return {signup, isLoading, error}
}
