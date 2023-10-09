const express = require('express');
const router = express.Router();

// Ruta GET: /api/users
router.get('/api/users', (req, res) => {
  // Lógica para obtener una lista de usuarios
  res.json({ message: 'Lista de usuarios' });
});

// Ruta POST: /api/users
router.post('/api/users', (req, res) => {
  // Lógica para crear un nuevo usuario
  res.json({ message: 'Usuario creado' });
});

module.exports = router;
