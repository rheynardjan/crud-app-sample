require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).catch((err) => console.log(err));

//SCHEMA AND MODEL
const postSchema = mongoose.Schema({
    title: String,
    description: String
});

const Post = mongoose.model("Post", postSchema);

app.post("/create", (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description
    }).then((doc) => console.log(doc)).catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
    Post.find()
    .then(items => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
    Post.findByIdAndDelete({_id: req.params.id})
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
    Post.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description
    }).then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
};

app.listen(process.env.PORT || 3001, function(){
    console.log("Server is running.");
});