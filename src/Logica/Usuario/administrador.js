import Insumo from "./Logica/Usuario/usuario.js";
export default class Administrador extends Usuario {

    constructor(id, nombre, contraseña, cargo, permisos) {
        super(id, nombre, contraseña, cargo, permisos);

        permisoCrearInsumo = true;
        permisoLeerInsumo = true;
        permisoActualizarInsumo = true;
        permisoEliminarInsumo = true;
        permisoCrearExistencia = true;
        permisoLeerExistencia = true;
        permisoActualizarExistencia = true;
        permisoEliminarExistencia = true;
    }
}