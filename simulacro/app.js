var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fs = require('fs');
var logger = require('morgan');
var multer = require('multer');
const multerFactory= multer({storage: multer.memoryStorage()})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//1ºConfigura un servidor con Express.js que escuche en el puerto 3500
const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
// 2º Define un middleware para registrar en la consola las peticiones que llegan al servidor (ruta, método, y hora de la petición).
app.use((req, res, next) => {
  const now = new Date();
  console.log(`${req.url} ${req.method} [${now.toISOString()}]  `);
  next();
});
  
// Crea un gestor de rutas específico para la página de inicio (/)
app.get('/',(req,res)=>{
  console.log("a",services)
  res.render('index', {services, message:null})
})

var services = [];
const blacklist = new Set(); // Lista negra de IPs

// Expresión regular para detectar patrones de inyección SQL
const sqlInjectionPattern = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|--|;)\b|[' "])/i;
// Middleware de validación
function validateForm(req, res, next) {
    const { nombre, precio } = req.body;
    const ip = req.ip; // Obtener la IP del cliente

    // Verificar si la IP está en la lista negra
      if (blacklist.has(ip)) {
        return res.render('index', {
          message: "Acceso denegado. Tu IP ha sido bloqueada.",
          services,
      });
    }

    // Detectar intentos de inyección SQL
    const values = Object.values(req.body);
    for (const value of values) {
        if (sqlInjectionPattern.test(value)) {
            blacklist.add(ip); // Agregar a la lista negra
            return res.render('index', {
              message: 'Intento de inyección SQL detectado y bloqueado. IP: ${ip}',
              services,
          });
            
        }
    }

    // Validar los campos del formulario
    if (!nombre || nombre.length < 3) {
        return res.render('index', {
          message: 'El nombre es obligatorio y debe tener al menos 3 caracteres.',
          services,
      });
    }

    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
        return res.render('index', {
          message: '"El precio debe ser un número mayor a 0."',
          services,
      });
    }

    // Si todo está bien, continuar con el siguiente middleware o la ruta
    next();
}




app.post('/addService',multerFactory.single('foto'),validateForm, (req,res)=>{
  const {nombre, desc, precio} = req.body;
  let imageUrl = null;
  if (req.file) {
    const uploadPath = path.join(__dirname, 'public/uploads');
    const filePath = path.join(uploadPath, req.file.originalname);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(filePath, req.file.buffer);
    imageUrl = `/uploads/${req.file.originalname}`;
  }

  // Guardar el servicio en memoria
  services.push({ nombre, desc, precio: parseFloat(precio), imageUrl });
  
  console.log("nombre",services)
  res.render('index', { 
    message: `Servicio "${nombre}" agregado con éxito.`,
    services 
});
})

app.get('/servicios',(req,res)=>{
  res.render('servicios', {services});
})
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
