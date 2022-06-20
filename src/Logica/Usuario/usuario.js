import Administrador from "./administrador.js";
import getConnection from "./Logica/Usuario/administrador.js";

export default class Usuario {

    constructor(id, nombre, contraseña, cargo) {
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.cargo = cargo;
        permisoCrearInsumo = false;
        permisoLeerInsumo = false;
        permisoActualizarInsumo = false;
        permisoEliminarInsumo = false;
        permisoCrearExistencia = false;
        permisoLeerExistencia = false;
        permisoActualizarExistencia = false;
        permisoEliminarExistencia = false;
    }
}