const express = require('express');

const userDb = require("./userDb");

const postDb = require("../posts/postDb.js");

const router = express.Router();


// const logger = require("../middlewares/logger");


//Adds New user
router.post('/',validateUser,(req, res) => {

  const {name} = req.body;
  userDb.insert({name})
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(404).json({error: "Error creating user."})
  })
});

//Add new user post***
router.post('/:id/posts', (req, res) => {
  const post = req.body;

  postDb.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
   .catch(err => {
     res.status(500).json({error: "Cannot add post."})
   });
});

router.get('/', (req, res) => {
  userDb.get()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(404).json({error: "Unable to retrieve users."})
  })
});

// get single user with id
router.get('/:id',validateUserId, (req, res) => {
  userDb.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "No user with specified id found."})
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
const {id} = req.params

  userDb.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    res.status(500).json({error: "Error getting posts from this id"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
 userDb.remove(req.params.id)
 .then(user => {
   res.status(200).json({alert: "User has been deleted."});
 })
});

router.put('/:id',validateUserId, (req, res) => {
  const {id} =req.params
  const {name}= req.body
  userDb.update(id, {name})
  .then(() => {
    userDb.getById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: "Could not get updated user." });
      });
  })
  .catch(err => {
    res.status(500).json({ message: "Could not update user." });
  });
});	

//custom middlewares

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user=user;
      next();
    }
    else {
      res.status(400).json({error: "No user with this id found"})
    }
  })
 }
 

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: "Name entered is invalid" });
  } else {
    next();
  }
}
  


function validatePost(req, res, next) {
   if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "Missing required text field" });
    }
  } else {
    res.status(400).json({ message: "Missing post data" });
  }
}

module.exports = router;
