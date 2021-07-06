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


//GET /thread
app.get('/thread',(req, res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("Getting Threads");
    res.json([]);
    //thread (function(err,threads){
      //  if(err){
       //     console.log(`there was an error listing Threads`,err);
       //     res.status(500).json({
        //        message: `unable to list todos`, error: err 
        //    });
        //    return;
       // }
      //  res.status(200).json(threads);
   // });`
});

app.get('/thread/:id',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`Getting Threads with id ${req.params.id}`);
    res.json([]);
})

app.post('/thread',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`New Thread`);
    res.json([]);
});

app.delete('/thread/:id',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`Deleting Thread ${req.params.id}`);
    res.json([]);
});

app.post('/post',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`creating new post`);
    res.json([]);
});

app.delete('/post/:thread_id/:post_id', (req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting post of a thread ${req.params.thread_id} post ${req.params.post_id}`);
    res.json([]);
});

module.exports= app;