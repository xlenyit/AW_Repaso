const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs'); // Configurar EJS como motor de vistas
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que esta línea apunte a la carpeta correcta de vistas

// Almacenamiento de imágenes usando multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Array para almacenar usuarios
const users = [];

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', {users});
});

// Ruta de registro
app.get('/register', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'register.html'));
  res.render('register');
});

// Manejo del formulario de registro
app.post('/register', upload.single('userPhoto'), (req, res) => {
  const { name, lastName, email, password } = req.body;
  const photo = req.file ? req.file.filename : 'default.jpg';

  const newUser = {
    name,
    lastName,
    email,
    password,
    photo,
  };

  users.push(newUser);

  res.redirect('/');
});

// // Obtener lista de usuarios en formato JSON
// app.get('/users', (req, res) => {
//   res.json(users);
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
