const express = require("express");
const cors = require("cors");
const app= express();



app.use(cors());
app.use(express.json({}));
app.use((req, res, next)=>{
    console.log("Time:", Date.now(),
     " - Method:", req.method, 
     "-Path", req.originalUrl,
      "-Body: ", req.body);
    next();
})


//GET /forum
app.get('/todo',(req, res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("Getting Threads");
    thread (function(err,threads){
        if(err){
            console.log(`there was an error listing todos`,err);
            res.status(500).json({
                message: `unable to list todos`, error: err 
            });
            return;
        }
        res.status(200).json(threads);
    });
})


//GET /forum/:id

//POST /thread

//DELETE /thread/:id

//POST /post

//DELETE /post/:thread_id/:post_id

module.exports= app;