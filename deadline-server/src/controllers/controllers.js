require('dotenv').config();
//const { API_KEY } = process.env;
//const { createUserWithEmailAndPassword } = require("firebase/auth");
const { User } = require("../../models"); // Importa el modelo User
//const { auth } = require("./firebase");
/*
const { Dog, Temperament } = require("../db.js"); // PRBOAR DB SIN JS
*/



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
  


  module.exports = {
    register,
    usersdata
};
  



