var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
var multer = require('multer');
const multerFactory= multer({storage: multer.memoryStorage()})



var app = express();

const PORT = 3500;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
var infoMiddle = (req, res, next)=>{
  var horaPeticion = new Date();
  console.log(req.url, req.method, horaPeticion.toISOString());
  next();
}
var bannedList = new Set();
var isBanned = (req,res,next)=>{
  if(bannedList.has(req.ip)){
    const err = new Error('Ha sido baneado');
    err.status = 400; // Código HTTP para "Bad Request"
    return next(err);
  }
  next();
}
var validateForm = (req, res, next)=>{
  const {nombre, desc} = req.body;
  const precio = parseFloat(req.body.precio);
  console.log("ao2",req.body)
  console.log(bannedList)
  
  var min3charCheck = /^.{3,}$/;
  var sqlInjection = /(\b(SELECT|INSERT|DELETE|DROP|UNION|--|UPDATE)\b)/i;
  const sqlInjectionPattern = /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|--|;)\b|[' "])/i;
  
  Object.values({nombre, desc}).forEach(ele=>{
      if(sqlInjection.test(ele)){
        console.log("aque", ele)
        const err = new Error('Será baneado por intento de hackeo');
        bannedList.add(req.ip);
        err.status = 400; // Código HTTP para "Bad Request"
        return next(err);
      }
  })
  
  if(!nombre){
    const err = new Error('Nombre es obligatorio');
    err.status = 400; // Código HTTP para "Bad Request"
    return next(err);
  }
  if(!min3charCheck.test(nombre)){
    const err = new Error('Nombre debe tener minimo 3 caracteres');
    err.status = 400; // Código HTTP para "Bad Request"
    return next(err);
  }
  if(precio <= 0){
    const err = new Error('Precio debe ser un número mayor a 0.');
    err.status = 400; // Código HTTP para "Bad Request"
    return next(err);
  }

  next();
}
app.get('/',infoMiddle, isBanned, (req, res, next) =>{
  res.render('index', {mensaje:null});
});
var servicesList = [];
app.post('/addService',infoMiddle,isBanned,multerFactory.single('foto'),validateForm, (req, res, next) =>{
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
  console.log(req.body)
  const {nombre, desc} = req.body;
  const precio = parseFloat(req.body.precio);
  servicesList.push({nombre, desc, precio,imageUrl});
  console.log(servicesList)
  res.render('index', {mensaje: "Se ha añadido el servicio con exito: "+nombre+" "+desc+" "+ precio})
});

app.get('/servicios', (req,res)=>{
  res.render('services', {servicios:servicesList});
})
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
app.listen(PORT,()=>{
  console.log("Escuchando en puerto", PORT);
})

module.exports = app;
