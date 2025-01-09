var express = require('express');
var router = express.Router();
var multer = require('multer')

// var validateForm = (req,res,next)=>{
//     const {nombre, apellidos, correo, contrasena} = req.body;
    
//     else {
//         console.log("Llego al else vale supongo")
//         next();
//     }
//     // next();
// }
router.get("/", (req,res)=>{
    res.render("registro" )
})

router.post("/register",(req,res,next)=>{
    console.log("Llego a tu corazoncito")
    const {nombre, apellidos, correo, contrasena} = req.body;
    console.log(nombre, apellidos, correo, contrasena)
    console.log(req.body)
    const correoCheck = /@ucm\.es$/;
    if(!nombre){
        const err = new Error("Nombre es obligatorio");
        err.status = 404; 
        res.status(404);
        // res.render('error', {err})
        next(err)
    }
    if(!apellidos){
        const err = new Error("Apellidos es obligatorio");
        err.status = 404; 
        res.status(404);
        // res.render('error', {err})
        next(err)
    }
    if(!correoCheck.test(correo)){
        const err = new Error("El correo debe terminar en @ucm.es");
        err.status = 404; 
        res.status(404);
        // res.render('error', {err})
        next(err)
    }
    req.app.locals.usuariosList.push({nombre, apellidos, correo, contrasena})
    // console.log(usuariosList)
    res.redirect("/usuarios")
})

module.exports = router;