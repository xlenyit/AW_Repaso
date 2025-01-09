var express = require('express');
var router = express.Router();
var multer = require('multer')

router.get("/", (req,res)=>{
    res.render("registro" )
})
var validateForm = (req,res,next)=>{
    const {nombre, apellidos, correo, contrasena} = req.body;
    if(!nombre){
        console.log("Llego al if ")
        const err = new Error("Nombre es obligatorio");
        err.status = 404; 
        res.status(404);
        // res.render('error', {err})
        next(err)
    }
    else {
        console.log("Llego al else vale supongo")
        next();
    }
    // next();
}
router.post("/register",validateForm, (req,res)=>{
    console.log("Llego a tu corazoncito")
    const {nombre, apellidos, correo, contrasena} = req.body;
    // req.app.push({nombre, apellidos, correo, contrasena})
    // console.log(usuariosList)
    res.redirect("/usuarios")
})

module.exports = router;