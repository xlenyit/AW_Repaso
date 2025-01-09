var createError = require('http-errors');
var express = require('express');
var path = require('path');

var usersRouter = require('./routes/usuarios');
var registerRouter = require('./routes/registro');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.usuariosList = [{
    nombre: "Aitor",
    apellidos: "Tilla Patata",
    correo: "aitor@ucm.es",
    pass: "ATP01",
    foto: "aitorTilla.png"
}];
 


app.use('/usuarios', usersRouter);
app.use('/registro', registerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {err});
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Escuchando desde el puerto", PORT);
})

module.exports = app;

