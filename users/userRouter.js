const express = require('express');
const users = require('./userDb');
const { checkUserId, checkUserData,checkPostData} = require('../middleware/user');
const { getUserPosts } = require('./userDb');

const router = express.Router();

router.post('/',checkUserData(), (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    })
});

router.post('/:id/posts',checkPostData(),checkUserId(), (req, res, next) => {
  users.addpost(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    })
});

router.get('/', (req, res) => {
  users.get(users)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(error => {
      next(error);
    })
});

router.get('/:id', checkUserId(),(req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts',checkUserId(), (req, res) => {
  console.log(req.user.id, "user id");
  getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error);
    })
});

router.delete('/:id',checkUserId(), (req, res) => {
  users.remove(req.user.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "The user has been deleted",
        })
      } else {
        res.status(404).json({
          message: "The user could not be found",
        })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the user",
      })
    })
});

router.put('/:id',checkUserData(),checkUserId(), (req, res) => {
  users.update(req.params.id, req.body)
  .then((user) => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: "The user could not be found",
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "Error updating the user",
    })
  })
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
