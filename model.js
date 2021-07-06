const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    author: String,
    body: String,
    thread_id: { type: mongoose.Schema.Types.ObjectId, ref:"Thread" },

},
{timestamps: true }
);

const threadSchema = mongoose.Schema({
    author: String,
    name: String,
    description: String,
    posts: [postSchema],
    category: String,
}, 
{timestamps: true}
);

const Thread = mongoose.model("Thread", threadSchema);

module.exports = {
    Thread,
}