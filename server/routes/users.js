const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require('../models/Blog');

router.get("/", (req, res) => {
  User.find().then(users => {
    res.status(200).json(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
    User.findById(id)
      .then(users => {
        if (users) {
          res.status(200).json(users);
        } else res.status(404).send('ERROR: NOT FOUND');
      });
});

router.post("/", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
    user.save(function (err, user) {
      if (user) {
        res.status(201).send(user);
      } else console.log(err);
    });
    console.log(user);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
    User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
      .then(users => {
      res.status(204).json(users);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id
  User.findByIdAndRemove(id)
    .then(users => {
      if (users) res.status(200).json(users);
    });
});

module.exports = router;
