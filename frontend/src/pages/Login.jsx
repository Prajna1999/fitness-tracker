import React , {useState}from 'react'
import { useLogin } from '../hooks/useLogin'

function Login() {
    const [email, setEmail]=useState('')

    const [password, setPassWord]=useState('')

    const {login, error, isLoading}=useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault()

        await  login(email, password)
    }


  return (
    <form className='login' onSubmit={handleSubmit} >
        <h3>Log In</h3>

        <label>Email:</label>

        <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
        
        
        />


<label>Password</label>

<input
    type="password"
    onChange={(e)=>setPassWord(e.target.value)}
    value={password}


/>  
<button disabled={isLoading}>Login</button>

{error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login