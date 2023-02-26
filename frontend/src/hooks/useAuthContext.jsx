import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

// hook to consume the auth context

export const useAuthContext=()=>{
    const context=useContext(AuthContext)

    if(!context){
        throw Error("useAuthCOntext must be used inside a useAuthContextProvider")
    }

    return context
}