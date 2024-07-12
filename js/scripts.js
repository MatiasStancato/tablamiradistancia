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
        posicionMira.textContent = `Posición de la Mira: ${medida.posicion}`;
    } else {
        posicionMira.textContent = "Distancia no encontrada.";
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

    const listadoFlechas = document.getElementById("listadoFlechas");
    listadoFlechas.innerHTML = "";
    for (let elemento in tablasDeMedidas) {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.textContent = elemento;
        div.appendChild(h3);

        const tabla = document.createElement("table");
        tabla.classList.add("tableMedidas");

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        const thDistancia = document.createElement("th");
        thDistancia.textContent = "Distancia";
        const thPosicion = document.createElement("th");
        thPosicion.textContent = "Posición de la Mira";
        trHead.appendChild(thDistancia);
        trHead.appendChild(thPosicion);
        thead.appendChild(trHead);
        tabla.appendChild(thead);

        const tbody = document.createElement("tbody");
        tablasDeMedidas[elemento].forEach(medida => {
            const tr = document.createElement("tr");
            const tdDistancia = document.createElement("td");
            tdDistancia.textContent = medida.distancia;
            const tdPosicion = document.createElement("td");
            tdPosicion.textContent = medida.posicion;
            tr.appendChild(tdDistancia);
            tr.appendChild(tdPosicion);
            tbody.appendChild(tr);
        });
        tabla.appendChild(tbody);

        div.appendChild(tabla);
        listadoFlechas.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', cargarElementos);