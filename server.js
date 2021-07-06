const express = require("express");
const cors = require("cors");
const {Thread} = require("./model")
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
    Thread.find({}, (err, threads)=>{
        if (err !=null){
            res.status(500).json({
                error: err,
                message: "Could not list threads",
            });
            return;
        }
        res.status(200).json(threads);
    })
});

app.get('/thread/:id',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`Getting Threads with id ${req.params.id}`);
    Thread.findById(req.params.id, (err, thread)=>{
        if (err !=null){
            res.status(500).json({
                error: err,
                message: "Could not get thread by id"
            })
        }else if (thread === null){
            res.status(404).json({
                message: "Thread was null"
            })
        }else{
            res.status(200).json(thread);
        }
    });
});

app.post('/thread',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`Creating New Thread`);
    creatingThread = {
        author: req.body.author || "",
        name: req.body.name || "",
        description: req.body.description || "N/A",
        category: req.body.category || "all",

    }
    Thread.create(creatingThread, (err, thread)=>{
        if(err){
            res.status(500).json({
                error: err,
                message: "Could not create new thread"
            })
            return;
        }
        res.status(201).json(thread)
    });
});

app.delete('/thread/:id',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`Deleting Thread ${req.params.id}`);
    Thread.findByIdAndDelete(req.params.id, (err,thread)=>{
        if(err){
            res.status(500).json({
                error: err,
                message: "Cannot Delete Thread"
            })
        }else if(thread===null){
            console.log("Unable to find thread");
            res.status(404);
        }else{
            res.status(200).json(delete thread);
        };
    });
});

app.post('/post',(req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`creating new post`);

    let newPost = {
        author: req.body.author || "",
        body: req.body.body || "",
        thread_id: req.body.thread_id || "",
    };
    Thread.findByIdAndUpdate(req.body.thread_id, {$push : {posts: newPost },},
        { new: true
        }, (err, thread)=>{
            if( err != null){
            res.status(500).json({
                error: err,
                message: "Unable to add a post to thread"
            })
            }else if(thread===null){
                res.status(404);
                console.log("Thread does not exist. Can't post a thread to unexistent thread")

            }
            else{
                res.status(201).json(thread)
            }
    }
    );
});

app.delete('/post/:thread_id/:post_id', (req,res)=>{
    res.setHeader("Content-Type","application/json");
    console.log(`deleting post of a thread ${req.params.thread_id} post ${req.params.post_id}`);
    Thread.findByIdAndUpdate(req.params.thread_id, {
        $pull :{posts: {
            _id: req.params.post_id,
        },
    },
    },{
        new: true,
    },
    (err, thread)=>{
        if(err !=null){
            res.status(500).json({
                error: err,
                message: "Unable to delete post from thread"
            });
        }else if(thread===null){
            res.status(404);
            console.log("Post doesn't exist. Can't delete.")
        }
        else{
            res.status(200).json(delete thread)
        }
    }
    );
});

module.exports= app;