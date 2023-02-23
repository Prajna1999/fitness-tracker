const express=require('express')

require('dotenv').config()



//env variables
const PORT=5001 ||process.env.PORT


//express app
const app=express()

//routes
app.get('/', (req, res)=>{
    res.json({mssg:'Welcome to the app'})
})



//listen to a certain port number

app.listen(PORT, ()=>{
    console.log('listening on port',PORT)
})