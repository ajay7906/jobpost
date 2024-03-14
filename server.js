const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
 
const app = express()

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'))
  .catch((error)=> console.log('Errror Occure', error));
  

app.listen(5000, ()=>{
    console.log('server is running on ');
})


// mongodb+srv://aks969014:<7906444281>@cluster0.rwnrjwj.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://aks969014:7906444281@cluster0.yzy9ttz.mongodb.net/jobpostpanel