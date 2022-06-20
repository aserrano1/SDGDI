const {BrowserWindow, ipcMain,  Notification} = require("electron");
const {getConnection} = require("./Logica/BaseDeDatos/database");
import CreadorDeTablas from "./Logica/BaseDeDatos/creadorDeTablas.js";
//const path = require('path');

ipcMain.on('asynchronous-crearTablas', async (event, arg) => {
    creadorDeTablas = new CreadorDeTablas();
    await creadorDeTablas.crearTablaInsumo()
    await creadorDeTablas.crearTablaExistencia()
    await creadorDeTablas.crearTablaUsuario()
})

ipcMain.on('asynchronous-crearInsumo', async (event, nuevoInsumo) => {
    crearInsumo(nuevoInsumo)
    //event.reply('asynchronous-reply', nuevosProductos)
    
    //resultado = await buscarProducto1(producto)

    //event.reply('asynchronous-reply', resultado)
})

ipcMain.on('asynchronous-crearExistencia', async (event, nuevaExistencia) => {
    crearExistencia(nuevaExistencia)
    //event.reply('asynchronous-reply', nuevosProductos)
    
    //resultado = await buscarProducto1(producto)

    //event.reply('asynchronous-reply-crearExistencia', resultado)
})

ipcMain.on('asynchronous-buscarInsumo', async (event, insumo) => {
    const resultado = await buscarInsumo1(insumo)
    //event.reply('asynchronous-reply', nuevosProductos)
    
    //resultado = await buscarProducto1(producto)

    event.reply('asynchronous-reply-buscarInsumo', resultado)
})

ipcMain.on('asynchronous-buscarInsumoProgresivamente', async (event, valores) => {
    const resultado = await buscarInsumoProgresivamente(valores[0], valores[1])

    event.reply('asynchronous-reply-buscarInsumoProgresivamente', resultado)
})

ipcMain.on('asynchronous-buscarExistencia', async (event, existencia) => {
    const resultado = await buscarExistencia1(existencia)
    //event.reply('asynchronous-reply', nuevosProductos)
    
    //resultado = await buscarProducto1(producto)

    event.reply('asynchronous-reply-buscarExistencia', resultado)
})
//crearExistencia(producto)

    //const consulta = obtenerProducto(producto.id_producto)

    /*const nuevoPoducto = {
        id: "hola",
        nombre: "hola",
        categoria: "hola2",
        etiqueta: "que tal",
        unidad: "bien",
        cantidad: 1
    }
    const nuevoPoducto2 = {
        id: "adios",
        nombre: "adios",
        categoria: "adios2",
        etiqueta: "que te vaya bien",
        unidad: "gracias",
        cantidad: 1
    }*/
    
    //const nuevosProductos = [nuevoPoducto, nuevoPoducto2]

async function verificarTabla () {
    const conexion = await getConnection();
    conexion.returnArgumentsArray = true
    
    try {
        await conexion.query('SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = "prueba"');
    } catch (error) {
        console.log(error);
    }
}

async function crearTablaInsumo () {
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
        'stock_maximo DECIMAL (7,3))');
    } catch (error) {
        console.log(error);
    }
}

async function crearTablaExistencia () {
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

async function crearTablaUsuario () {
    const conexion = await getConnection();

    try {
        await conexion.query('CREATE TABLE sdgdi.usuario ('+
        'usuario VARCHAR (100) PRIMARY KEY,'+
        'nombre VARCHAR (100) NOT NULL,'+
        'contraseña VARCHAR (100) NOT NULL,'+
        'ubicacion VARCHAR (100) NOT NULL,'+
        'fecha_ingreso DATE NOT NULL,'+
        'fecha_vencimiento DATE NOT NULL)');
    } catch (error) {
        console.log(error);
    }
}

async function crearInsumo(nuevoInsumo){
    try {
        nuevoInsumo.cantidad = 0

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

async function crearExistencia(nuevaExistencia){
    try {
        const conexion = await getConnection();

        await conexion.query("INSERT INTO existencia SET ?", nuevaExistencia);
        
        new Notification({
            title: "Hola",
            body: "Existencia creada"
        }).show();
    } catch (error) {
        console.log(error);
    }
}

async function obtenerProducto(codigo){
    try {
        const conexion = await getConnection();

        const resp = await conexion.query("SELECT * FROM producto WHERE id = ?", codigo);
        console.log("Esta es la repuesta: "+resp);

        return resp
    } catch (error) {
        console.log(error);
    }
}

async function buscarInsumo1(insumo){
    let condicionConsulta = ""

    if(insumo.codigo != "") condicionConsulta += "codigo = '"+insumo.codigo+"' "
    if(insumo.categoria != ""){
        if(condicionConsulta == "") condicionConsulta += "categoria = '"+insumo.categoria+"' "; else condicionConsulta += "AND categoria = '"+insumo.categoria+"' "
    }
    if(insumo.etiqueta != ""){
        if(condicionConsulta == "") condicionConsulta += "etiqueta = '"+insumo.etiqueta+"' "; else condicionConsulta += "AND etiqueta = '"+insumo.etiqueta+"' "
    }
    if(insumo.nombre != ""){
        if(condicionConsulta == "") condicionConsulta += "nombre = '"+insumo.nombre+"' "; else condicionConsulta += "AND nombre = '"+insumo.nombre+"' "
    }
    if(insumo.cantidad != undefined){
        if(condicionConsulta == "") condicionConsulta += "cantidad = "+insumo.cantidad; else condicionConsulta += "AND cantidad = "+insumo.cantidad
    }
    if(insumo.unidad != ""){
        if(condicionConsulta == "") condicionConsulta += "unidad = '"+insumo.unidad+"' "; else condicionConsulta += "AND unidad = '"+insumo.unidad+"' "
    }
    /*if(insumo.unidad != ""){
        if(condicionConsulta == "") condicionConsulta += "stock_minimo = '"+insumo.stockMinimo+"' "; else condicionConsulta += "AND stock_minimo = '"+insumo.stockMinimo+"' "
    }
    if(insumo.unidad != ""){
        if(condicionConsulta == "") condicionConsulta += "stock_maximo = '"+insumo.stockMaximo+"' "; else condicionConsulta += "AND stock_maximo = '"+insumo.stockMaximo+"' "
    }*/

    try {
        const conexion = await getConnection();

        if(condicionConsulta != ""){
            const resp = await conexion.query("SELECT * FROM insumo WHERE "+condicionConsulta)
            return resp
        }
    } catch (error) {
        console.log(error);
    }
}

async function buscarExistencia1(existencia){
    let condicionConsulta = ""

    if(existencia.codigo != "") condicionConsulta += "codigo = '"+existencia.codigo+"' "
    if(existencia.codigo_insumo != ""){
        if(condicionConsulta == "") condicionConsulta += "codigo_insumo = '"+existencia.codigo_insumo+"' "; else condicionConsulta += "AND codigo_insumo = '"+existencia.codigo_insumo+"' "
    }
    if(existencia.cantidad != ""){
        if(condicionConsulta == "") condicionConsulta += "cantidad = '"+existencia.cantidad+"' "; else condicionConsulta += "AND cantidad = '"+existencia.cantidad+"' "
    }
    if(existencia.fecha_ingreso != ""){
        if(condicionConsulta == "") condicionConsulta += "fecha_ingreso = '"+existencia.fecha_ingreso+"' "; else condicionConsulta += "AND fecha_ingreso = '"+existencia.fecha_ingreso+"' "
    }
    if(existencia.fecha_vencimiento != ""){
        if(condicionConsulta == "") condicionConsulta += "fecha_vencimiento = '"+existencia.fecha_vencimiento+"' "; else condicionConsulta += "AND fecha_vencimiento = '"+existencia.fecha_vencimiento+"' "
    }

    try {
        const conexion = await getConnection();

        if(condicionConsulta != ""){
            const resp = await conexion.query("SELECT * FROM existencia WHERE "+condicionConsulta)
            return resp
        }
    } catch (error) {
        console.log(error);
    }
}

async function buscarProducto2(producto){
    let consulta = ""

    if(producto.id != "") consulta += "id = '"+producto.id+"' OR "
    if(producto.nombre != "") consulta += "nombre = '"+producto.nombre+"' OR "
    if(producto.etiqueta != "") consulta += "etiqueta = '"+producto.etiqueta+"' OR "
    if(producto.unidad != "") consulta += "unidad = '"+producto.unidad+"' OR "
    if(producto.cantidad != undefined) consulta += "cantidad = "+producto.cantidad

    try {
        const conexion = await getConnection();
        
        let resp

        if(consulta != "") resp = await conexion.query("SELECT * FROM insumo WHERE "+consulta);
        console.log("Esta es la repuesta: "+resp);

        return resp
    } catch (error) {
        console.log(error);
    }
}

async function buscarInsumoProgresivamente(campo, valor){
    try {
        const conexion = await getConnection();
        
        let resp

        resp = await conexion.query("SELECT "+campo+" FROM insumo WHERE "+campo+" like '"+valor+"%'");

        return resp
    } catch (error) {
        console.log(error);
    }
}

let ventanaPrincipal

function crearVentanaPrincipal(){
    ventanaPrincipal = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation : false,
            //preload: path.join(__dirname, 'app.js')
        }
    });

    ventanaPrincipal.loadFile('src/iu/index.html');
}

module.exports = {
    crearVentanaPrincipal
}

/*app.whenReady().then(crearVentanaPrincipal);

app.on('windows-all-close', function() {
    if(process.platform == 'darwin'){
        app.quit();
    }
});

app.on('activate', function() {
    if(BrowserWindow.getAllWindows().length == 0){
        crearVentanaPrincipal();
    }
});*/

/* In main process.
const { ipcMain }=require('electron')
ipcMain.on('asynchronous-message',(event, arg)=>{console.log(arg)
// prints "ping"  
event.reply('asynchronous-reply','pong')})
ipcMain.on('synchronous-message',(event, arg)=>{console.log(arg)
// prints "ping"  
event.returnValue='pong'})

 //In renderer process (web page).
 // NB. Electron APIs are only accessible from preload, unless contextIsolation is disabled.
 // See https://www.electronjs.org/docs/tutorial/process-model#preload-scripts for more details.
 const { ipcRenderer }=require('electron')
 console.log(ipcRenderer.sendSync('synchronous-message','ping'))
 // prints "pong"
 ipcRenderer.on('asynchronous-reply',(event, arg)=>{console.log(arg)
 // prints "pong"
})
ipcRenderer.send('asynchronous-message','ping')*/