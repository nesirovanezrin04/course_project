const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express(); // ✅ əvvəl burada olmalıdır
const port = 3000;

let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home
app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

// Joke API route
app.get("/joke", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    res.send(response.data);
  } catch (error) {
    res.send("Error fetching joke");
  }
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

  if (!post) {
    return res.send("Post not found");
  }

  res.render("edit", { post: post });
});

// Update
app.post("/update/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);

  if (!post) {
    return res.send("Post not found");
  }

  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});