const express = require('express');
const projectDB = require('../data/models/projectModel');
// // const middleware = require('../api/middleware');

const router = express.Router();

//                                    GET PROJECTS
router.get('/', (req, res) => {
    projectDB.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested projects could not be retrieved: ${error} ***`});
        })
})

//                                      ADD PROJECT
router.post('/', (req, res) => {
    const proj = req.body;
    projectDB.addProject(proj)
        .then(project => {
            res.status(201).json({project});
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The project could not be added to the data base: ${error} ***`});
        })
})

module.exports = router;