const express=require('express');
const bodyParser=require('body-parser');
const workoutRoutes=require('./routes/workouts');
const  userRoutes=require('./routes/user'); 
const cors=require('cors')
const mongoose=require('mongoose');
require('dotenv').config();

// list of authorised domains. better to use .env to store authorised domains
const ALLOWED_DOMAINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
//express app
const app=express();



//middleware.Anything between server and client.
app.use(bodyParser.json());
app.use(cors({ origin: ALLOWED_DOMAINS })); // allow only authorised domains to access api
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next(); //moves to the next middleware
})

//routes realtive path.
app.use('/api/workouts',workoutRoutes)
app.use('/api/user', userRoutes)

//listen for requests only when we are connected to the db.
const PORT=process.env.PORT||5001

//DB Set up
const uriOptions={
    useNewUrlParser:true,
    useUnifiedTopology:true,
};

mongoose.set("strictQuery", true);

//connect to DB
mongoose.connect(process.env.MONGO_URI, uriOptions)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`connected to db and listening on port ${PORT} `)
    })
}).catch((error)=>{
    console.log(error)
})

