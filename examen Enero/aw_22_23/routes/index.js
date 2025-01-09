var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {usuarios:res.app.locals.usuarios, error:false});
  
  
});

router.post('/changePassword', function(req, res, next) {
  // Accediendo a los parámetros a través de req.params
  const user = req.body.user;
  const password = req.body.password;
  let correct
  res.app.locals.usuarios.forEach(ele => {
    if(ele.user === user && ele.pass === password) correct = true
  })
  if(correct === true) res.render("cambio",{user:user})
  else res.render('index', {usuarios:res.app.locals.usuarios, error:true});
});

router.post('/changePasswordThisTimeIsTheOneAndOnly/:user', function(req, res, next) {
  // Accediendo a los parámetros a través de req.params
  const password = req.body.password;
  console.log("AQUI",password)
  res.app.locals.usuarios.forEach(ele => {
    if(ele.user === req.params.user) ele.pass = password
  })
   res.render('index', {usuarios:res.app.locals.usuarios, error:false});
});

module.exports = router;