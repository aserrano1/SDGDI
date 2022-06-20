import Insumo from "./Logica/Usuario/usuario.js";
export default class Administrador extends Usuario {

    constructor(id, nombre, contraseña, cargo, permisoCrearInsumo, permisoLeerInsumo, 
        permisoActualizarInsumo, permisoEliminarInsumo, permisoEliminarInsumo, permisoCrearExistencia,
        permisoLeerExistencia, permisoLeerExistencia, permisoActualizarExistencia, permisoEliminarExistencia) {
        super(id, nombre, contraseña, cargo);

        this.permisoCrearInsumo = permisoCrearInsumo;
        this.permisoLeerInsumo = permisoLeerInsumo;
        this.permisoActualizarInsumo = permisoActualizarInsumo;
        this.permisoEliminarInsumo = permisoEliminarInsumo;
        this.permisoCrearExistencia = permisoCrearExistencia;
        this.permisoLeerExistencia = permisoLeerExistencia;
        this.permisoActualizarExistencia = permisoActualizarExistencia;
        this.permisoEliminarExistencia = permisoEliminarExistencia;
    }
}