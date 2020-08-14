const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();
const port = 5000;

server.use(express.json());

server.use(morgan("combined"));
server.use(usersRouter);
server.use(postsRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Something sent wrong, try again later',
    })
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});
