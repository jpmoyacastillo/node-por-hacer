const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    //default: true,
    alias: 'c',
    desc: 'Muestra estados NO COMPLETADOS (en comando "listar") o modifica estado de una tarea a completado (en comando "actualizar")'
};


const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea creada', {
        descripcion
    })
    .command('listar', 'Muestra la lista de tareas', {
        completado
    })
    .help()
    .argv;


module.exports = {
    argv
}