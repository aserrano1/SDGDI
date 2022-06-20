import Insumo from "./Logica/Usuario/usuario.js";
const {getConnection} = require("./database");

export default class DAOUsuario {

    constructor () {

    }

    crear (nuevoUsuario, rol) {
        try {
            const conexion = await getConnection();
            
            /*await conexion.query('INSERT INTO Usuario VALUES ("'+nuevoUsuario.id+'","'+rol+'","'+
            nuevoUsuario.nombre+'",PWDENCRYPT("'+nuevoUsuario.contraseña+'"),"'+nuevoUsuario.cargo+'",'+
            nuevoUsuario.permisoCrearInsumo+','+nuevoUsuario.permisoLeerInsumo+','+
            nuevoUsuario.permisoActualizarInsumo+','+nuevoUsuario.permisoEliminarInsumo+','+
            nuevoUsuario.permisoCrearExistencia+','+nuevoUsuario.permisoLeerExistencia+','+
            nuevoUsuario.permisoActualizarExistencia+','+nuevoUsuario.permisoEliminarExistencia+',)');*/

            await conexion.query("INSERT INTO Usuario VALUES (?,?,?,PWDENCRYPT(?),?,?,?,?,?,?,?,?,?,)", 
            [nuevoUsuario.id, rol, nuevoUsuario.nombre, nuevoUsuario.contraseña, nuevoUsuario.cargo, 
            nuevoUsuario.permisoCrearInsumo, nuevoUsuario.permisoLeerInsumo, nuevoUsuario.permisoActualizarInsumo, 
            nuevoUsuario.permisoEliminarInsumo, nuevoUsuario.permisoCrearExistencia, nuevoUsuario.permisoLeerExistencia, 
            nuevoUsuario.permisoActualizarExistencia, nuevoUsuario.permisoEliminarExistencia]);

            new Notification({
                title: "Hola",
                body: "Usuario creado"
            }).show();
        } catch (error) {
            console.log(error);
        }
    }

    leer (id, contraseña) {
        try {
            const conexion = await getConnection();
    
            const usuario = await conexion.query("SELECT * FROM producto WHERE id = ? AND PWDCOMPARE(?, contraseña)", [id, contraseña]);
    
            return usuario
        } catch (error) {
            console.log(error);
        }
    }

    actualizar(insumo) {

    }

    eliminar(id, contraseña) {
        try {
            const conexion = await getConnection();
    
            const insumo = await conexion.query("DELET FROM producto WHERE id = ? AND PWDCOMPARE(?, contraseña)", [id, contraseña]);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }
}