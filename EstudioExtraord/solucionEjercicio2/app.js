"use strict";

const path = require("path");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const crudUsuarios = require('./routes/crudUsuarios');

// Rutas
app.use('/contactos', crudUsuarios);

// Ruta para la página principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Agenda de Contactos' });
});

// Middleware para manejar errores 404 (no encontrado)
app.use(function (req, res, next) {
    res.status(404).render("error", { title: '404: Página no encontrada' });
});

// Middleware para manejar errores generales
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});
