const {getConnection} = require("./Logica/BaseDeDatos/database");
import Administrador from "./Logica/Usuario/administrador.js";

export default class CreadorUsuario {

    constructor() {
    }

    async ingresar(id, contraseña) {
        const conexion = await getConnection();
    
        try {
            const resp = await conexion.query("SELECT * FROM producto WHERE id = ? AND PWDCOMPARE(?, contraseña)", [id, contraseña]);
            await conexion.query('CREATE TABLE sdgdi.usuario ('+
            'id VARCHAR (100) PRIMARY KEY,'+
            'rol VARCHAR (100) NOT NULL,'+
            'nombre VARCHAR (100) NOT NULL,'+
            'contraseña VARBINARY (MAX) NOT NULL,'+
            'cargo VARCHAR (100) NOT NULL,'+
            'permiso_crear_insumo BIT NOT NULL,'+
            'permiso_leer_insumo BIT NOT NULL,'+
            'permiso_actualizar_insumo BIT NOT NULL,'+
            'permiso_eliminar_insumo BIT NOT NULL,'+
            'permiso_crear_existencia BIT NOT NULL,'+
            'permiso_leer_existencia BIT NOT NULL,'+
            'permiso_actualizar_existencia BIT NOT NULL,'+
            'permiso_eliminar_existencia BIT NOT NULL)');

            if(resp.rol == "administrador"){
                usuario = new Administrador(resp.id, resp.nombre, resp.contraseña, resp.cargo);
            }

            if(resp.rol == "trabajador"){
                usuario = new Administrador(resp.id, resp.nombre, resp.contraseña, resp.cargo, resp.permiso_crear_insumo,
                resp.permiso_leer_insumo, resp.permiso_actualizar_insumo, resp.permiso_eliminar_insumo, 
                resp.permiso_crear_existencia, resp.permiso_leer_existencia, resp.permiso_actualizar_existencia, 
                resp.permiso_eliminar_existencia);
            }

            return resp
        } catch (error) {
            console.log(error);
        }
    }
}