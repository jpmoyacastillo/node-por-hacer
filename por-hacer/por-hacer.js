//requires
const fs = require('fs');

//arreglo para el listado de notas
let listadoPorHacer = [];


//funcion para guardar arreglo en la BD
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });

}

//funcion para leer antes la base de datos y sobreescribir en ella. En caso de error por json 
//vacio, crea un arreglo [] vacío y asi el error no corre
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}


//funcion para crear una tarea en la bd
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer)

    guardarDB();

    return porHacer;

}

//funcion que permpite leer el listado de tareas y retornarlo
const getListado = (completado) => {

    cargarDB();

    let listadoBusqueda = listadoPorHacer.filter(tarea => tarea.completado !== completado);
    return listadoBusqueda;
}

//funcion que permite actualizar un dato de acuerdo a la descripcion entregada por el usuario
const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    // OTRA OPCION MAS CORTA: let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    // Si el index de la posicion del elemento es mayor o igual que 0 (-1 quiere decir que no lo encontró) cambiamos la propierdad completado por lo ingresado por el usuario
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

//exportar la funciones a utilizar en app.js
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}