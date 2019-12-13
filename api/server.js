const express = require('express');
const helmet = require('helmet');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectRoutes);
server.use('/api/tasks', taskRoutes);

server.get('/', (req, res) => {
    res.send("Sprint Challenge BE Week 2 is up and running!")
})
module.exports = server;