const express = require('express');
const projectDB = require('../data/models/projectModel');
const taskDB = require('../data/models/taskModel');
const resourceDB = require('../data/models/resourceModel');
// const middleware = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
    resourceDB.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested projects could not be retrieved: ${error} ***`});
        })
})

router.post('/', (req, res) => {
    const proj = req.body;
    resourceDB.addResource(proj)
        .then(project => {
            res.status(201).json({project});
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The project could not be added to the data base: ${error} ***`});
        })
})

module.exports = router;