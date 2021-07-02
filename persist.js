const mongoose = require("mongoose");

function connect(callback){
    let connectionString = "mongodb+srv://todo_2021:T0d0App@cluster0.5j58h.mongodb.net/forum?retryWrites=true&w=majority";
    console.log("connect to db...")
    mongoose
        .connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .catch((err)=>{
            console.log("There was an error connecting to the database")
        });
    mongoose.connection.once("open", callback);
}

module.exports = {
    connect,
}
