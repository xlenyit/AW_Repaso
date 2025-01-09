const express = require('express');
const router = express.Router();

let usuarios = {
    "usuarios_externos": {
        "usuario": [
            {
                "id": "Felipe",
                "nombre": "Felipe Lotas",
                "telefonos": {
                    "casa": "952124567"
                }
            },
            {
                "id": "Alberto",
                "nombre": "Alberto Cadiscos",
                "telefonos": {
                    "casa": "912382722",
                    "movil": "678234567"
                }
            },
            {
                "id": "Borja",
                "nombre": "Borja Món de York",
                "telefonos": {
                    "movil": "678234567"
                }
            },
            {
                "id": "Aitor",
                "nombre": "Aitor Tilla",
                "telefonos": {
                    "casa": "912382722",
                    "movil": "678234567",
                    "oficina": "927121212"
                }
            },
            {
                "id": "Diego",
                "nombre": "Diego Norrea",
                "telefonos": {
                    "oficina": "927121213"
                }
            },
            {
                "id": "Jesús",
                "nombre": "Jesús Piros de España",
                "telefonos": {
                    "casa": "912382722",
                    "movil": "678234567"
                }
            },
            {
                "id": "Rubén",
                "nombre": "Rubén Tosidad",
                "telefonos": {
                    "casa": "952124567"
                }
            }
        ]
    }
};

// Obtener todos los objetos
router.get('/', (req, res) => {
    res.json(usuarios);
});

// Obtener un objeto por su índice
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index < 0 || index >= usuarios.usuarios_externos.usuario.length) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.json(usuarios.usuarios_externos.usuario[index]);
});

// Añadir un objeto
router.post('/', (req, res) => {
    const nuevoUsuario = req.body;
    // Validación para evitar duplicados
    const usuarioExistente = usuarios.usuarios_externos.usuario.some(user => user.id === nuevoUsuario.id);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario con este ID ya existe.' });
    }
    usuarios.usuarios_externos.usuario.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Eliminar un objeto
router.post('/delete', (req, res) => {
    const index = parseInt(req.body.index);
    if (isNaN(index) || index < 0 || index >= usuarios.usuarios_externos.usuario.length) {
        return res.status(404).json({ error: 'Usuario no encontrado desde server' });
    }
    const usuarioEliminado = usuarios.usuarios_externos.usuario.splice(index, 1);
    //usuarios.usuarios_externos.usuario = usuarios.usuarios_externos.usuario.filter((user, idx) => idx !== index);
    res.json(usuarioEliminado);
});

// Actualizar un objeto
router.post('/update', (req, res) => {
    const index = parseInt(req.body.index);
    if (isNaN(index) || index < 0 || index >= usuarios.usuarios_externos.usuario.length) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    usuarios.usuarios_externos.usuario[index] = req.body;
    res.json(usuarios.usuarios_externos.usuario[index]);
});

module.exports = router;