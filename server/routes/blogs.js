const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const User = require('../models/User');

router.get("/", (req, res) => {
  Blog.find().then(blogs => {
    res.status(200).json(blogs);
  });
});

router.get("/featured", (req, res) => {
  Blog.find({featured: true})
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(blogs => {
      if (!!blogs) {
        res.status(200).json(blogs);
      } else res.status(404).send('ERROR: NOT FOUND');
    });
}); 

router.post("/", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    article: req.body.article,
    published: req.body.published,
    featured: req.body.featured,
    author: req.body.author
  });
    blog.save(function (err, blog) {
      if (blog) {
        res.status(201).send(blog);
      } else console.log(err);
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
    Blog.findByIdAndUpdate(id, {
      title: req.body.title,
      article: req.body.article,
      published: req.body.published,
      featured: req.body.featured,
      author: req.body.author
    })
      .then(blogs => {
      res.status(204).json(blogs);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id
  Blog.findByIdAndRemove(id)
    .then(blogs => {
      if (blogs) res.status(200).json(blogs);
    });
});

module.exports = router;
