let tablasDeMedidas = JSON.parse(localStorage.getItem('tablasDeMedidas')) || {};

function mostrarTabla() {
    const elemento = document.getElementById("elemento").value;
    const tabla = document.getElementById("tablaMedidas");
    const tbody = tabla.querySelector("tbody");

    tbody.innerHTML = ""; // Limpiar tabla

    if (elemento) {
        const medidas = tablasDeMedidas[elemento];
        if (medidas) {
            medidas.forEach(medida => {
                const fila = document.createElement("tr");
                const celdaDistancia = document.createElement("td");
                const celdaPosicion = document.createElement("td");

                celdaDistancia.textContent = medida.distancia;
                celdaPosicion.textContent = medida.posicion;

                fila.appendChild(celdaDistancia);
                fila.appendChild(celdaPosicion);
                tbody.appendChild(fila);
            });
            tabla.style.display = "table";
        }
    } else {
        tabla.style.display = "none";
    }
}

function buscarPosicion() {
    const distancia = parseInt(document.getElementById("distancia").value);
    const elemento = document.getElementById("elemento").value;
    const medidas = tablasDeMedidas[elemento];
    const posicionMira = document.getElementById("posicionMira");

    const medida = medidas ? medidas.find(m => m.distancia === distancia) : null;
    if (medida) {
        posicionMira.textContent = `Mira: ${medida.posicion}`;
    } else {
        posicionMira.textContent = "Sin valor";
    }
}

function cargarElementos() {
    const selectElemento = document.getElementById("elemento");
    selectElemento.innerHTML = '<option value="">Seleccione</option>';
    for (let elemento in tablasDeMedidas) {
        const option = document.createElement("option");
        option.value = elemento;
        option.textContent = elemento;
        selectElemento.appendChild(option);
    }


}

document.addEventListener('DOMContentLoaded', cargarElementos);