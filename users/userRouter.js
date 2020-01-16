const express = require('express');

const userDb = require("./userDb");

const postDb = require("../posts/postDb.js");

const router = express.Router();


// const logger = require("../middlewares/logger");



router.post('/', (req, res) => {
  userDb.insert(req.body.user)
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    res.status(404).json({error: "Error creating user."})
  })
});

// function insert(user) {
//   return db('users')
//     .insert(user)
//     .then(ids => {
//       return getById(ids[0]);
//     });
// }


// function insert(user) {
//   return db('users')
//     .insert(user)
//     .then(ids => {
//       return getById(ids[0]);
//     });
// }

router.post('/:id/posts', (req, res) => {
  const post = req.body;

  postDb.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
   .catch(err => {
     res.status(500).json({error: "Cannot add post."})
   })
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

router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err,"ERROR in .GET/");
    res.status(404).json({error: "No user with specified id found."})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
 userDb.remove(req.params.id)
 .then(user => {
   res.status(200).json({alert: "User has been deleted."});
 })
});

router.put('/:id', (req, res) => {
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

// function validateUserId(req, res, next) {
//   userDb.getById(req.params.id)
//   .then(user => {
//     if (user) {
//       req.user=user;
//       next();
//     }
//     else {
//       res.status(400).json({error: "No user with this id found"})
//     }
//   })
//  }

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
    if (req.body) {
    if (req.body.name) {
      next();
    }
    else {
      res.status(400).json({ message: "Name field required." })
    }
  } else {
    res.status(400).json({ message: "Missing user data" })
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
