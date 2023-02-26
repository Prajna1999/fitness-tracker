import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WorkoutsContextProvider } from './context/WorkoutContext'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the context provider in the App component */}
    {/* All components will have access to the WorkoutsContext
     */}

     <AuthContextProvider>
    <WorkoutsContextProvider>
      
        <App />
    </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
