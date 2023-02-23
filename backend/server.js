const express=require('express')

const workoutRoutes=require('./routes/workouts')

require('dotenv').config()



//env variables
const PORT=5001||process.env.PORT


//express app
const app=express()


//middleware, logging the path everytime
//client makes a request on the FE
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
//routes
//GET request handler
app.use('/api/workouts',workoutRoutes)


//listen to a certain port number

app.listen(PORT, ()=>{
    console.log('listening on port',PORT)
})