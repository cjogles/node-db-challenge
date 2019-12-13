const express = require('express');
const projectDB = require('../data/models/projectModel');
const middleware = require('../api/middleware');

const router = express.Router();

//                                      GET PROJECTS
router.get('/', (req, res) => {
    projectDB.get()
        .then(projects => {
            console.log(projects);
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested projects could not be retrieved: ${error} ***`});
        })
})

//                                      GET PROJECT BY ID
router.get('/:id', middleware.validateProjectID, (req, res) => {
    const id = req.params.id;
    projectDB.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested project specified by ID could not be retrieved: ${error} ***`});
        })
})

//                                      ADD PROJECT
router.post('/', middleware.validateProject, (req, res) => {
    const proj = req.body;
    projectDB.insert(proj)
        .then(project => {
            res.status(201).json({project});
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The project could not be added to the data base: ${error} ***`});
        })
})

//                                      EDIT PROJECT BY ID
router.put('/:id', middleware.validateProjectID, middleware.validateProject, (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    projectDB.update(id, updates)
        .then(editedProject => {
            res.status(200).json({editedProject});
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** Project could not be edited: ${error} ***`});
        })
})

//                                      DELETE PROJECT
router.delete('/:id', middleware.validateProjectID, (req, res) => {
    const id = req.params.id;
    projectDB.remove(id)
        .then(removed => {
            res.status(200).json({message: "successfully removed from database."})
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** Could not delete project: ${error} ***`});
        })
})

module.exports = router;