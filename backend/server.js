const express=require('express')
const mongoose=require('mongoose');
const workoutRoutes=require('./routes/workouts')

require('dotenv').config()



//env variables
const PORT=5001||process.env.PORT


//express app
const app=express()

//middle ware for POST requests handling
app.use(express.json())

//middleware, logging the path everytime
//client makes a request on the FE
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})
//routes
//GET request handler
app.use('/api/workouts',workoutRoutes)

//connect to DB

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen to a certain port number

app.listen(PORT, ()=>{
    console.log('listening on port',PORT)
})
    }).catch((error)=>{
        console.log(error)
    })

