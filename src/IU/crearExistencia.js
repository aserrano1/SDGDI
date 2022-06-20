const {remote, ipcRenderer} = require("electron")

let resultado = document.getElementById("resultado");
let listaCoincidencias = document.getElementById("coincidencias");
let listaExistencias = document.getElementById("listaExistencias");

const formularioBusqueda = document.getElementById("formularioBuscarInsumo");
const busquedaCriterio = document.getElementById("criterio");
const busquedaValorBusqueda = document.getElementById("valor_busqueda");

const formularioExistencia = document.getElementById("formularioCrearExistencia");
const existenciaCodigo = document.getElementById("codigo");
const existenciaCodigoInsumo = document.getElementById("codigo_insumo");
const existenciaCantidad = document.getElementById("cantidad");
const existenciaUbicacion = document.getElementById("ubicacion");
const existenciaFechaIngreso = document.getElementById("fecha_ingreso");
const existenciaFechaVencimiento = document.getElementById("fecha_vencimiento");

busquedaValorBusqueda.addEventListener('keyup', (e) => {
    console.log("a")

    const criterios = [
        busquedaCriterio.value,
        busquedaValorBusqueda.value
    ]

    ipcRenderer.send('asynchronous-buscarInsumoProgresivamente', criterios)
    
    ipcRenderer.on('asynchronous-reply-buscarInsumoProgresivamente', (event, resultado) => {
        listarCoincidencias(resultado)
    })
})

formularioBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();

    let insumo = {
        codigo: "",
        categoria: "",
        etiqueta: "",
        nombre: "",
        ubicacion: "",
        cantidad: undefined,
        unidad: ""
    }

    switch (busquedaCriterio.value) {
        case 'codigo':
            insumo.codigo = busquedaValorBusqueda.value
            break;
        case 'categoria':
            insumo.categoria = busquedaValorBusqueda.value
            break;
        case 'etiqueta':
            insumo.etiqueta = busquedaValorBusqueda.value
            break;
        case 'nombre':
            insumo.nombre = busquedaValorBusqueda.value
            break;
        case 'unidad':
            insumo.unidad = busquedaValorBusqueda.value
            break;
        case 'cantidad':
            insumo.cantidad = busquedaValorBusqueda.value
            break;
        case 'stock minimo':
            insumo.stock_minimo = busquedaValorBusqueda.value
            break;
        case 'stock maximo':
            insumo.stock_maximo = busquedaValorBusqueda.value
    }    

    ipcRenderer.send('asynchronous-buscarInsumo', insumo)

    ipcRenderer.on('asynchronous-reply-buscarInsumo', (event, resultado) => {
        listarInsumos(resultado)
    })
})

formularioExistencia.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaExistencia = {
        codigo: existenciaCodigo.value,
        codigo_insumo: existenciaCodigoInsumo.value,
        cantidad: existenciaCantidad.value,
        ubicacion: existenciaUbicacion.value,
        fecha_ingreso: existenciaFechaIngreso.value,
        fecha_vencimiento: existenciaFechaVencimiento.value
    }

    ipcRenderer.send('asynchronous-crearExistencia', nuevaExistencia)
})

function desplegarExistencias(idElemento){

    const existencia = {
        codigo: "",
        codigo_insumo: idElemento,
        cantidad: "",
        fecha_ingreso: "",
        fecha_vencimiento: ""
    }

    ipcRenderer.send('asynchronous-buscarExistencia', existencia)

    ipcRenderer.on('asynchronous-reply-buscarExistencia', (event, resultado) => {
        listarExistencias(resultado)
    })
}

function listarInsumos(insumos) {
    let filas = ""
    
    insumos.forEach(function(insumo) {
        filas += '<tr id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '    <td>'+insumo.codigo+'</td>'+
                    '    <td>'+insumo.categoria+'</td>'+
                    '    <td>'+insumo.etiqueta+'</td>'+
                    '    <td>'+insumo.nombre+'</td>'+
                    '    <td>'+insumo.cantidad+'</td>'+
                    '    <td>'+insumo.unidad+'</td>'+
                    '    <td>'+insumo.stock_minimo+'</td>'+
                    '    <td>'+insumo.stock_minimo+'</td>'+
                    '</tr>'
    });

    resultado.innerHTML = filas
}

function listarExistencias(existencias) {
    let filas = ""
    
    existencias.forEach(function(existencia) {
        filas += '<tr id="'+insumo.codigo+'" onclick="desplegarExistencias(this.id)" class="animate__animated animate__backInLeft">'+
                    '    <td>'+existencias.codigo+'</td>'+
                    '    <td>'+existencias.categoria+'</td>'+
                    '    <td>'+existencias.etiqueta+'</td>'+
                    '    <td>'+existencias.nombre+'</td>'+
                    '    <td>'+existencias.cantidad+'</td>'+
                    '    <td>'+existencias.unidad+'</td>'+
                    '    <td>'+existencias.stock_minimo+'</td>'+
                    '    <td>'+existencias.stock_minimo+'</td>'+
                    '</tr>'
    });

    resultado.innerHTML = filas
}

function listarCoincidencias(coincidencias) {
    let lista = ""

    coincidencias.forEach(function(coincidencia) {
        switch (busquedaCriterio.value) {
            case 'codigo':
                lista += '<option>'+coincidencia.codigo+'</option>'
                break;
            case 'categoria':
                lista += '<option>'+coincidencia.categoria+'</option>'
                break;
            case 'etiqueta':
                lista += '<option>'+coincidencia.etiqueta+'</option>'
                break;
            case 'nombre':
                lista += '<option>'+coincidencia.nombre+'</option>'
                break;
            case 'unidad':
                lista += '<option>'+coincidencia.unidad+'</option>'
                break;
            case 'cantidad':
                lista += '<option>'+coincidencia.cantidad+'</option>'
                break;
            case 'stock minimo':
                lista += '<option>'+coincidencia.stock_minimo+'</option>'
                break;
            case 'stock maximo':
                lista += '<option>'+coincidencia.stock_maximo+'</option>'
        }       
    });

    listaCoincidencias.innerHTML = lista
}