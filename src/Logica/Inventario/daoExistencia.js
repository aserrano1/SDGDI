import Insumo from "./Logica/Inventario/existencia.js";
const {getConnection} = require("./database")

export default class DAOExistencia {

    constructor () {

    }

    crear (nuevaExistencia) {
        try {
            const conexion = await getConnection();
            
            await conexion.query('INSERT INTO existencia SET ?', nuevaExistencia);
    
            new Notification({
                title: "Hola",
                body: "Insumo creado"
            }).show();
        } catch (error) {
            console.log(error);
        }
    }

    leer (codigo) {
        try {
            const conexion = await getConnection();
    
            const insumo = await conexion.query("SELECT * FROM existencia WHERE id = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }

    actualizar(existencia) {

    }

    eliminar(codigo) {
        try {
            const conexion = await getConnection();
    
            const insumo = await conexion.query("DELET FROM existencia WHERE id = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }
}