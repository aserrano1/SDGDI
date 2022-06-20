import getConnection from "./Logica/BaseDeDatos/database.js";
export default class CreadorDeTablas {

    constructor() {
    }

    async crearTablaInsumo () {
        const conexion = await getConnection();
    
        try {
            await conexion.query('CREATE TABLE sdgdi.insumo ('+
            'codigo VARCHAR (100) PRIMARY KEY,'+
            'categoria VARCHAR (100),'+
            'etiqueta VARCHAR (100),'+
            'nombre VARCHAR (100) NOT NULL,'+
            'cantidad DECIMAL (7,3),'+
            'unidad VARCHAR (100) NOT NULL,'+
            'stock_minimo DECIMAL (7,3),'+
            'stock_maximo DECIMAL (7,3)'+
            'costo MONEY)');
        } catch (error) {
            console.log(error);
        }
    }
    
    async crearTablaExistencia () {
        const conexion = await getConnection();
    
        try {
            await conexion.query('CREATE TABLE sdgdi.existencia ('+
            'codigo VARCHAR (100) PRIMARY KEY,'+
            'codigo_insumo VARCHAR (100) NOT NULL,'+
            'cantidad DECIMAL (7,3) NOT NULL,'+
            'ubicacion VARCHAR (100) NOT NULL,'+
            'fecha_ingreso DATE NOT NULL,'+
            'fecha_vencimiento DATE NOT NULL)');
        } catch (error) {
            console.log(error);
        }
    }

    async crearTablaUsuario () {
        const conexion = await getConnection();
    
        try {
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
        } catch (error) {
            console.log(error);
        }
    }
}