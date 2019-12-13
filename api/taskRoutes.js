const express = require('express');
const projectDB = require('../data/models/projectModel');
const taskDB = require('../data/models/taskModel');
const middleware = require('./middleware');

const router = express.Router();

//                                      GET PROJECT tasks BY PROJECT ID
router.get('/:id/tasks', middleware.validateProjectID, (req, res) => {
    const id = req.params.id;
    projectDB.getProjecttasks(id)
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** The response containing requested project tasks specified by project ID could not be retrieved: ${error} ***`});
        })
})

//                                      ADD ACTION BY PROJ ID
router.post('/:id/tasks', middleware.validateAction, middleware.validateProjectID, (req, res) => {
    const id = req.params.id;
    const action = req.body;
    projectDB.get(id)
        .then(findProj => {
            taskDB.insert(action)
                .then(addedAction => {
                    res.status(201).json(addedAction);
                })
                .catch(error => {
                    res.status(500).json({errorMessage: `*** The action could not be added with the given action body params: ${error} ***`});
                })
        })
        .catch(error => {
            res.status(500).json({errorMessage: `*** Could not find project by ID: ${error} ***`});
        })
})

//                                      EDIT PROJ ACTION BY PROJ ID AND ACTION ID
router.put('/:id/tasks/:aid', middleware.validateProjectID, middleware.validateAction, (req, res) => {
    const id = req.params.id;
    const actionID = req.params.aid;
    const action = req.body;
    projectDB.get(id)
        .then(foundProj => {
            taskDB.get(actionID)
                .then(foundAction => {
                    taskDB.update(actionID, action)
                        .then(updates => {
                            res.status(201).json({updates});
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        })
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

//                                      DELETE ACTION BY PROJ ID AND ACTION ID
router.delete('/:id/tasks/:aid', middleware.validateProjectID, (req, res) => {
    const id = req.params.id;
    const actionID = req.params.aid;
    projectDB.get(id)
        .then(foundProj => {
            taskDB.get(actionID)
                .then(foundAction => {
                    taskDB.remove(id)
                        .then(removed => {
                            res.status(200).json(removed);
                        })
                        .catch(error => {
                            res.status(500).json(error);
                        })
                })
                .catch(error => {
                    res.status(500).json(error);
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;