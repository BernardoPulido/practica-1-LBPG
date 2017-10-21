var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer();

var librosCtrl = require('../controllers/LibrosController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
router.get('/libros', function(req, res, next){
  res.render('index', { title: 'Libros', saludo: '¡Hola!' });
});

router.post('/libros', function(req, res, next){
  res.status(200).jsonp({nombre:'Código Da Vinci', autor:'Dan Brown'});
});*/

router.route('/libros')
  .get(librosCtrl.getLibros)
  .post(upload.array(), librosCtrl.addLibro);

router.route('/libros/:id')
  .get(librosCtrl.getById)
  .put(upload.array(), librosCtrl.updateLibro)
  .delete(librosCtrl.deleteLibro);

router.route('/autores')
  .get(librosCtrl.getAutores); //Devuelve todos los autores

router.route('/autores/:nombre')
  .get(librosCtrl.getByName)//Devuelve todos los libros del autor
  .put(upload.array(), librosCtrl.updatePorAutor) //Actualizar nombre de autor en los libros
  .delete(librosCtrl.deletePorAutor); //Eliminar libros del autor

module.exports = router;
