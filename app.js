//REQUIRES
//importamos la configuracion de comando del yargs
const argv = require('./config/yargs').argv
    //importamos el archivo y funcion crear desde el archivo por-hacer
const porHacer = require('./por-hacer/por-hacer');
//importamos el colors
const colors = require('colors');

//creamos un variable con el primer argumento del arreglo creado por el argv, y yargs de comandos
let comando = argv._[0];

//recibimos el primer argumento o comando ingresado en consola y lo cambiamos por distintas acciones en cada caso (crear,actualizar,listar)
switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':

        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('========Por Hacer=========='.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('==========================='.green);
        }

        //console.log('Mostrar todas las tareas por hacer');
        break;

    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no es reconocido.');


}