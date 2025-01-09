var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('encuesta');
  
  
});

router.post('/upload', function(req, res, next) {
  const edad = req.body.edad;
  const conocido = req.body.conocido;
  const lugar = req.body.lugar;
  res.app.locals.respuestas.push({edad,conocido,lugar})
  res.render("gracias")
});

router.get('/resultados', function(req, res, next) {
  res.render("resultados")
});

module.exports = router;