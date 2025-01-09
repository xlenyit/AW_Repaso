const { name } = require('ejs');
const express = require('express');
const router = express.Router();

let contactos = [
  { id: 1, nombre: "Felipe Lotas", telefonos: { casa: "952124567" } },
  { id: 2, nombre: "Alberto Cadiscos", telefonos: { casa: "912382722", movil: "678234567" } },
  { id: 3, nombre: "Borja Món de York", telefonos: { movil: "678234567" } },
  { id: 4, nombre: "Aitor Tilla", telefonos: { casa: "912382722", movil: "678234567", oficina: "927121212" } },
  { id: 5, nombre: "Diego Norrea", telefonos: { oficina: "927121213" } },
  { id: 6, nombre: "Jesús Piros de España", telefonos: { casa: "912382722", movil: "678234567" } },
  { id: 7, nombre: "Rubén Tosidad", telefonos: { casa: "952124567" } }
];

// Obtener todos los objetos
router.get('/', (req, res) => {
    // res.json(contactos);
    res.render('contactos', {contactos});
});

// Obtener un objeto por su índice
router.get('/buscar', (req, res) => {
  const id = parseInt(req.query.id);
  const contacto = contactos.find(c => c.id === id);
  if (!contacto) {
    return res.status(404).send('Contacto no encontrado');
  }
  res.render('contactos', { contactos: [contacto] });
});

// Añadir un nuevo contacto
router.post('/aniadir', (req, res) => {
  let name = req.body.nombre;
  let typephone = req.body.typephone;
  let phone = req.body.phone;
  const newId = contactos.length ? contactos[contactos.length - 1].id + 1 : 1; // Si hay algun contacto, se coge el id del ultimo y le añade 1, sino empieza en 1.
  const newContacto = { id: newId, nombre: name, telefonos: { [typephone]: phone } };
  contactos.push(newContacto);
  console.log("hola", newContacto)
  res.redirect('/contactos');
});

// eliminar un contacto por id
router.post('/delete', (req, res) => {
  let id = req.body.id;
  const contactoIndex = contactos.findIndex(c => c.id === id);
  if (!contacto) {
    return res.status(404).send('Contacto no encontrado');
  }
  contactos.splice(contactoIndex, 1);
  res.redirect('/contactos');
});

// actualizar un contacto por id
router.post('/update', (req,res)=>{

  let id = parseInt(req.body.updateId);
  const contactoIndex = contactos.findIndex(c => c.id === id);
  if (contactoIndex === -1) {
    return res.status(404).send('Contacto no encontrado');
  }
  contactos[contactoIndex].nombre = req.body.nombre ? req.body.nombre : contactos[contactoIndex].nombre;
  contactos[contactoIndex].telefonos[req.body.typephone] = req.body.phone ? req.body.phone : contactos[contactoIndex].telefonos[req.body.typephone];
  res.redirect('/contactos');

});
module.exports = router;