var libros = [
  {
    id: '101',
    titulo: 'Código Da Vinci',
    autor: 'Dan Brown',
    anio: 2010,
    genero: 'Novela'
  },
  {
    id: '102',
    titulo: 'Relatos de un viejo indecente',
    autor: 'Charles Bukowski',
    anio: 2010,
    genero: 'Relatos'
  },
  {
    id: '103',
    titulo: 'Matar un ruiseñor',
    autor: 'Harper Lee',
    anio: 1960,
    genero: 'Novela'
  },
  {
    id: '104',
    titulo: 'El nombre de la rosa',
    autor: 'Umberto Eco',
    anio: 1986,
    genero: 'Novela'
  },
  {
    id: '105',
    titulo: 'Ve y pon un centinela',
    autor: 'Harper Lee',
    anio: 2015,
    genero: 'Novela'
  },
  {
    id: '106',
    titulo: 'El cementerio de Praga',
    autor: 'Umberto Eco',
    anio: 2010,
    genero: 'Novela'
  }
];

exports.getLibros = function(req, res, next){
  console.log('GET /libros');
  res.status(200).jsonp(libros);
};

exports.addLibro = function(req, res, next){
  console.log('POST /libros');
  var ids = [];
  var cont=0;
  libros.forEach(function (l) {
      if(l.id!=undefined){
          ids[cont] = l.id;
          cont++;
      }
  });
  if(ids.indexOf(req.body.id)==-1){
      libros.push(req.body);
      res.status(200).jsonp(libros);
  }else{
      res.status(404).jsonp({error:'404', descrip:'Ya existe un registro con el ID ingresado.'});
  }


};

exports.getById = function(req, res, next){
    console.log('GET /libros:id');
    console.log(req.params.id);
    var id = undefined;
      for(var i=0; i<libros.length; i++){
          if(libros[i].id===req.params.id){
            id = i;
            break;
          }
      }
      if(id!=undefined){
        res.status(200).jsonp(libros[id]);
      }else{
        res.status(404).jsonp({error:'404', descrip:'Recurso no existente'});
      }
};

exports.updateLibro = function(req, res, next){
    /**
     * Modificar registro libro, proporcionando los datos correspondientes.
     */
    console.log('PUT /libros/:id');
    console.log(req.params.id);
    console.log(req.body);
    var id = undefined;
    for(var i=0; i<libros.length; i++){
        if(libros[i].id===req.params.id){
            id = i;
            break;
        }
    }

    if(id!=undefined){
        //Encontró el registro
        req.body.autor?libros[id].autor=req.body.autor:null;
        req.body.titulo?libros[id].titulo=req.body.titulo:null;
        req.body.anio?libros[id].anio=req.body.anio:null;
        req.body.genero?libros[id].genero=req.body.genero:null;
        res.status(200).jsonp(libros[id]);
    }else{
        //Registro no existente
        res.status(404).jsonp({error:'404', descrip:'Recurso no existente'});
    }
};
exports.deleteLibro = function(req, res, next){
    /**
     * Eliminar registro libro de "base de datos";
     */
    console.log('DELETE /libros/:id');
    console.log(req.params.id);

    var id = undefined;
    for(var i=0; i<libros.length; i++){
        if(libros[i].id===req.params.id){
            id = i;
            break;
        }
    }
    if(id!=undefined){
        res.status(200).jsonp(libros[id]);
        libros.splice(id,1);
    }else{
        res.status(404).jsonp({error:'404', descrip:'Recurso no existente'});
    }
};

exports.getAutores = function(req, res, next){
    /**
     * Obtener todos los autores de los libros en la base de datos.
     */
    console.log('GET /autores');
    var arregloAutores=[];
    var contador=0;
    libros.forEach(function (libro) {
        if(libro.autor!=undefined) {
            if (arregloAutores.indexOf(libro.autor.toUpperCase()) == -1) {
                arregloAutores[contador] = libro.autor.toUpperCase();
                contador++;
            }
        }
    });
    if(contador==0){
        res.status(404).jsonp({error:'404', descrip:'No existen autores en la base de datos.'});
    }else{
        res.status(200).jsonp(arregloAutores);
    }

};

exports.getByName = function (req, res, next) {
    /**
     *  Obtener los libros relacionados con el autor
       (NOMBRE). Debido a que NOMBRE es de tipo String,
       la búsqueda no distinguirá entre mayúsuclas y
       minúsculas. En caso de no encontrar el autor, retornar
       un objeto JSON con un código y descripción del error.
      */
    console.log('GET /autores:nombre');
    console.log(req.params.nombre);
    var librosporautor = [];
    var contador=0;

    for(var i=0; i<libros.length; i++){
        if(libros[i].autor!=undefined) {
            if (libros[i].autor.toUpperCase() === req.params.nombre.toUpperCase()) {
                librosporautor[contador] = libros[i];
                contador++;
            }
        }
    }
    if(contador==0){
        res.status(404).jsonp({error:'404', descrip:'Autor no encontrado.'});
    }else{
        res.status(200).jsonp(librosporautor);
    }

};
exports.updatePorAutor = function (req, res, next) {
    /**
     * Actualizar el nombre del autor identificado con
     NOMBRE. Deben de actualizarse el nombre del autor
     en todos los libros. El método debe de regresar todos
     los registros actualizados. En caso de no encontrar
     libros del autor, retornar un objeto JSON con un código
     y descripción del error.
     */
    console.log('PUT /autores:nombre');
    console.log(req.params.nombre);
    console.log(req.body);
    var librosporautor = [];
    var contador=0;

    for(var i=0; i<libros.length; i++){
        if(libros[i].autor!=undefined) {
            if (libros[i].autor.toUpperCase() === req.params.nombre.toUpperCase()) {
                if (req.body.autor != undefined) {
                    libros[i].autor = req.body.autor;
                }
                librosporautor[contador] = libros[i];
                contador++;
            }
        }
    }
    if(contador==0){
        res.status(404).jsonp({error:'404', descrip:'Autor no encontrado.'});
    }else{
        res.status(200).jsonp(librosporautor);
    }


};
exports.deletePorAutor = function(req, res, next){
    /**
     * Eliminar todos los libros que se encuentren
       relacionaciodos con el autor (NOMBRE). El método
       debe de regresar todos los registros eliminados. En
       caso de no encontrar libros autor, retornar un objeto
       JSON con un código y descripción del error.
      */
    console.log('DELETE /autores:nombre');
    console.log(req.params.nombre);
    var librosporautor = [];
    var contador=0;

    for(var i=libros.length-1; i>=0; i--){
        if(libros[i].autor!=undefined){
            if(libros[i].autor.toUpperCase()===req.params.nombre.toUpperCase()){
                librosporautor[contador]=libros[i];
                contador++;
                libros.splice(i,1);
            }
        }
    }
    if(contador==0){
        res.status(404).jsonp({error:'404', descrip:'Autor no encontrado.'});
    }else{
        res.status(200).jsonp(librosporautor);
    }
};

