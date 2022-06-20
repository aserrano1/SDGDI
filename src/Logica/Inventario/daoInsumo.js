import Insumo from "./Logica/Inventario/insumo.js";
const {getConnection} = require("./database");

export default class DAOInsumo {

    constructor () {

    }

    crear (nuevoInsumo) {
        try {
            const conexion = await getConnection();
            
            await conexion.query('INSERT INTO insumo SET ?', nuevoInsumo);
    
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
    
            const insumo = await conexion.query("SELECT * FROM producto WHERE id = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }

    actualizar(insumo) {

    }

    eliminar(codigo) {
        try {
            const conexion = await getConnection();
    
            const insumo = await conexion.query("DELET FROM producto WHERE id = ?", codigo);
    
            return insumo
        } catch (error) {
            console.log(error);
        }
    }
}