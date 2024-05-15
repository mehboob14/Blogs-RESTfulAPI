const { render } = require('ejs');
const express = require('express');

const { v4: uuidv4 } = require('uuid');
const method = require("method-override");



const app = express();
let port = 3000;
app.use(method('_method'));
const path = require('path');
app.use(express.urlencoded({ extended: true }));


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log(`Server Listing on port : ${port}`);
});

let posts = [{
        id: uuidv4(),
        username: "Mehboob",
        content: "LOVE TO CODE! lorem episom is sample paragraph which is mostly used for to test something and i'am also use it for the same purpose  "
    }, {
        id: uuidv4(),
        username: "Fahad",
        content: "HardWrok is important to achieve sucesss!"
    }, {
        id: uuidv4(),
        username: "Irfan",
        content: "I got my Coding Intership!"
    },
    {
        id: uuidv4(),
        username: "Ahamd",
        content: "Train your mind to see good in every situation!"
    }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.post("/posts", (req, res) => {

    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");

});
/*
app.get("/posts/:id/Edit", (req, res) => {
     let {id} = req.params;
     let post = posts.find((p) => id === p.id);
     res.render("edit.ejs",{post});
 });  */

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("edit.ejs", { post });
    } //else {

    // res.status(404).send("Post not found");
    //  }
});

app.delete("posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.render("index.ejs");
})