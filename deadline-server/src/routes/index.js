const express = require('express');
const router = express.Router();
//const axios = require('axios');
const {
    register,
    usersdata,
    projectRoutes,
    taskRoutes,
    memberRoutes,
    getProjects,
    getTasksByProject,
    getMembersByProject
} = require("../controllers/controllers.js");




router.post('/register', register)
//router.post('/projects', projectRoutes);
//router.post('/tasks', taskRoutes);
//router.post('/members', memberRoutes);
//los get--------------
router.get('/usersdata/:firebaseUid', usersdata);
//router.get('/projects', getProjects);
//router.get('/projects/:projectId/tasks', getTasksByProject);
//router.get('/projects/:projectId/members', getMembersByProject);



module.exports = router;