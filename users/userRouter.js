const express = require('express');

const userDb = require("./userDb");

const postDb = require("../posts/postDb.js")

const router = express.Router();


const logger = require("../middlewares/logger");

router.use(express.json())




router.post('/',logger, (req, res) => {
 
});

router.post('/:id/posts',logger, (req, res) => {
  // do your magic!

});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
