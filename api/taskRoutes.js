const express = require('express');
const projectDB = require('../data/models/projectModel');
const taskDB = require('../data/models/taskModel');
// const middleware = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
    taskDB.get()
        .then(tasks => {
            res.status(200).json(tasks);
            projectDB.get()
                .then(projects => {
                    res.status(200).json(projects.name, projects.description)
                })
                .catch(error => {
                    res.status(500).json({errorMessage: `*** The response containing requested projects could not be retrieved: ${error} ***`});
                })
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested projects could not be retrieved: ${error} ***`});
        })
})

router.post('/', (req, res) => {
    const proj = req.body;
    taskDB.addTask(proj)
        .then(project => {
            res.status(201).json({project});
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The project could not be added to the data base: ${error} ***`});
        })
})

module.exports = router;