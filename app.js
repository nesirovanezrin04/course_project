const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home
app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

// Create post
app.post("/create", (req, res) => {
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/");
});

// Delete
app.post("/delete/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

// Edit page
app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render("edit", { post: post });
});

// Update
app.post("/update/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});