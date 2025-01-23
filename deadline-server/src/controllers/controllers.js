require('dotenv').config();

const { Project, ProjectMember, User, Task } = require('../models');

const register = async (req, res) => {

    const { name, email, firebaseUid } = req.body;

    if (!name || !email || !firebaseUid) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
  
    try {
      // Crear usuario en la base de datos
      const newUser = await User.create({
        name,
        email,
        firebaseUid,
      });
  
      res.status(201).json({ message: 'Usuario creado con éxito.', user: newUser });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }

  };






// Crear un proyecto
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user.id; // ID del usuario autenticado

    const project = await Project.create({ name, description, createdBy });
    await ProjectMember.create({ projectId: project.id, userId: createdBy }); // Agrega al creador como miembro

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};





// Crear una tarea
const createTask = async (req, res) => {
  try {
    const { name, description, projectId, assignedTo } = req.body;

    const task = await Task.create({ name, description, status: 'pending', projectId, assignedTo });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};



// Agregar un miembro a un proyecto
const addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const member = await ProjectMember.create({ projectId, userId });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el miembro' });
  }
};

// LOS GET-----------------------------


const usersdata = async (req, res) => {
  try {
    const { firebaseUid } = req.params;  // Accede al firebaseUid desde los parámetros de la URL
    
    // Buscar usuario por Firebase UID
    const user = await User.findOne({ where: { firebaseUid } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};



const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['id', 'name', 'email'],  // Asegúrate de ajustar los atributos que quieras mostrar
        },
        {
          model: ProjectMember,
          include: [{ model: User, attributes: ['id', 'name'] }],
        },
      ],
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.findAll({ 
      where: { projectId }, 
      include: [{ model: User, as: 'assignedTo', attributes: ['id', 'name'] }]
    });
    
    if (!tasks) {
      return res.status(404).json({ error: 'No se encontraron tareas para este proyecto.' });
    }
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas del proyecto:", error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



const getMembersByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const members = await ProjectMember.findAll({
      where: { projectId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!members.length) {
      return res.status(404).json({ error: 'No se encontraron miembros para este proyecto.' });
    }

    res.status(200).json(members);
  } catch (error) {
    console.error("Error al obtener miembros del proyecto:", error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

  


  module.exports = {
    register,
    usersdata,
    createProject,
    createTask,
    addMember,
    getProjects,
    getTasksByProject,
    getMembersByProject
};
  



