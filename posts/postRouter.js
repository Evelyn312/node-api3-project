const express = require('express');
const posts = require('./postDb');
const {checkPostId} =require('../middleware/post');
const {checkPostData} = require('../middleware/user')


const router = express.Router();

router.get('/posts', (req, res) => {
  posts.get(posts)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(error => {
      next(error);
    })
});

router.get('/posts/:id',checkPostId(), (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/posts/:id', checkPostId(),(req, res) => {
  posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The post has been deleted",
        })
      } else {
        res.status(404).json({
          message: "The post could not be found",
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the post",
      })
    })
});

router.put('/posts/:id',checkPostData(),checkPostId(), (req, res) => {
  posts.update(req.params.id, req.body)
  .then((post) => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: "The post could not be found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error updating the post",
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
