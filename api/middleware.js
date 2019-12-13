const projectDB = require('../data/models/projectModel');

//                                      CUSTOM MIDDLEWARE
function validateProjectID (req, res, next) {
    const id = req.params.id;
    projectDB.get(id)
    .then(projectExists => {
      if (projectExists) {
        req.project = projectExists;
        next();
      } else {
        res.status(400).json({errorMessage: 'Invalid project ID.'});
      }
    })
    .catch(error => {
      res.status(500).json({error: 'error validating user ID'});
    })
}

function validateProject(req, res, next) {
    const projectBody = req.body;
    if (!projectBody) {
      res.status(400).json({error: 'Missing Project Data.'});
    } else if (!projectBody.name || !projectBody.description) {
      res.status(400).json({error: 'Missing required project fields: name or description.'});
    } else {
      next();
    }
  }

function validateTask(req, res, next) {
    const taskBody = req.body;
    if (!taskBody) {
      res.status(400).json({error: 'Missing User Data.'});
    } else if (!taskBody.project_id || !taskBody.notes || !taskBody.description) {
      res.status(400).json({error: 'Missing required action field: project_id or notes or description.'});
    } else {
      next();
    }
}

module.exports = {
  validateProjectID,
  validateTask,
  validateProject,
};