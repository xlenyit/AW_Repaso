var express = require('express');
var router = express.Router();

router.get("/", (req,res)=>{
    res.render("usuarios", {usuariosList: req.app.locals.usuariosList} )
})


module.exports = router;