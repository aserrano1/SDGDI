const {remote, ipcRenderer} = require("electron")

const formulario = document.getElementById("formularioDeIngreso");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if(insumoStockMinimo.value != "") stockMinimo = parseFloat(insumoStockMinimo.value)
    if(insumoStockMaximo.value != "") stockMaximo = parseFloat(insumoStockMaximo.value)

    const nuevoInsumo = {
        codigo: insumoCodigo.value,
        categoria: insumoCategoria.value,
        etiqueta: insumoEtiqueta.value,
        nombre: insumoNombre.value,
        cantidad: 0,
        unidad: insumoUnidad.value,
        stock_minimo: stockMinimo,
        stock_maximo: stockMaximo
    }

    console.log(nuevoInsumo);

    ipcRenderer.send('asynchronous-crearInsumo', nuevoInsumo)
})