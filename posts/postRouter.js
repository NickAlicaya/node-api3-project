const express = require('express');

const postDb = require("./postDb.js");

const router = express.Router();


router.get('/', (req, res) => {
  postDb.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "Posts not found."})
  })
});


router.get('/:id', (req, res) => {
   postDb.getById(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "No post with specified id found."})
  })
});


router.delete('/:id', (req, res) => {
  postDb.remove(req.params.id)
  .then(posts => {
    res.status(200).json({alert:"Post was successfully deleted."})
  })
  .catch(err => {
    console.log(err,"ERROR in .DELETE/");
    res.status(404).json({error: "No post with that specified id found."})
  })
});


router.put('/:id', (req, res) => {

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
  // do your magic!
}

module.exports = router;
