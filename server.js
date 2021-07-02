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
app.get('/forum',(req, res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("Getting Threads");
    res.status(200);
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

app.get('/forum/:id',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log("Getting Threads");
    res.status(200);
})

app.post('/thread',(req,res)=>{

});

app.delete('/thread/:id',(req,res)=>{

});

app.post('/post',(req,res)=>{

});

app.delete('/post/:thread_id/:post_id', (req,res)=>{

});
//GET /forum/:id

//POST /thread

//DELETE /thread/:id

//POST /post

//DELETE /post/:thread_id/:post_id

module.exports= app;