const express = require('express');

const postDb = require("./postDb.js");// make sure in between

const router = express.Router();



router.get('/',  (req, res) => {
  postDb.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "Posts not found."})
  })
});


router.get('/:id',validatePostId, (req, res) => {
   postDb.getById(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "No post with specified id found."})
  })
});


router.delete('/:id',validatePostId, (req, res) => {
  postDb.remove(req.params.id)
  .then(posts => {
    res.status(200).json({alert:"Post was successfully deleted."})
  })
  .catch(err => {
    console.log(err,"ERROR in .DELETE/");
    res.status(404).json({error: "No post with that specified id found."})
  })
});


router.put('/:id',validatePostId,validatePost, (req, res) => {

  postDb.update(req.params.id, req.body)
  .then(post => {
    res.json(post)
  })
  .catch(err => {
    console.log(err,"ERROR in .PUT/posts");
    res.status(500).json({error: "Post could not be saved to server."})
  })
});

// custom middleware

function validatePostId(req, res, next) {
 postDb.getById(req.params.id)
 .then(post => {
   if (post) {
     req.post=post;
     next();
   }
   else {
     res.status(400).json({error: "No post with this id found"})
   }
 })
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
