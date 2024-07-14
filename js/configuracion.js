let tablasDeMedidas = JSON.parse(localStorage.getItem('tablasDeMedidas')) || {};

function cargarConfiguracion() {
    const tabla = document.getElementById("tablaConfiguracion").querySelector("tbody");
    tabla.innerHTML = ''; // Limpia la tabla

    for (const elemento in tablasDeMedidas) {
        tablasDeMedidas[elemento].forEach((medida, index) => {
            const fila = document.createElement("tr");
            const celdaElemento = document.createElement("td");
            const celdaDistancia = document.createElement("td");
            const celdaPosicion = document.createElement("td");
            const celdaAcciones = document.createElement("td");
            const botonEliminar = document.createElement("button");

            celdaElemento.textContent = elemento;
            celdaDistancia.innerHTML = `<input type="number" class="distancia" value="${medida.distancia}">`;
            celdaPosicion.innerHTML = `<input type="text" class="posicion" value="${medida.posicion}">`;
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = function() {
                eliminarElemento(fila, elemento, index);
            };
            celdaAcciones.appendChild(botonEliminar);

            fila.appendChild(celdaElemento);
            fila.appendChild(celdaDistancia);
            fila.appendChild(celdaPosicion);
            fila.appendChild(celdaAcciones);
            tabla.appendChild(fila);
        });
    }
}

function agregarElemento() {
    const nuevoElemento = document.getElementById("nuevoElemento").value;
    if (!nuevoElemento) {
        alert("Ingrese un elemento.");
        return;
    }

    if (!tablasDeMedidas[nuevoElemento]) {
        tablasDeMedidas[nuevoElemento] = [];
    }

    const tabla = document.getElementById("tablaConfiguracion").querySelector("tbody");
    const fila = document.createElement("tr");
    const celdaElemento = document.createElement("td");
    const celdaDistancia = document.createElement("td");
    const celdaPosicion = document.createElement("td");
    const celdaAcciones = document.createElement("td");
    const botonEliminar = document.createElement("button");

    celdaElemento.textContent = nuevoElemento;
    celdaDistancia.innerHTML = '<input type="number" class="distancia">';
    celdaPosicion.innerHTML = '<input type="text" class="posicion">';
    botonEliminar.textContent = "X";
    botonEliminar.onclick = function() {
        eliminarElemento(fila, nuevoElemento, tablasDeMedidas[nuevoElemento].length);
    };
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(celdaElemento);
    fila.appendChild(celdaDistancia);
    fila.appendChild(celdaPosicion);
    fila.appendChild(celdaAcciones);
    tabla.appendChild(fila);
}

function guardarConfiguracion() {
    const filas = document.querySelectorAll("#tablaConfiguracion tbody tr");
    tablasDeMedidas = {}; // Reset tablasDeMedidas

    filas.forEach(fila => {
        const elemento = fila.cells[0].textContent;
        const distancia = parseInt(fila.cells[1].querySelector('input').value);
        const posicion = fila.cells[2].querySelector('input').value;

        if (!tablasDeMedidas[elemento]) {
            tablasDeMedidas[elemento] = [];
        }

        if (distancia && posicion) {
            tablasDeMedidas[elemento].push({ distancia, posicion });
        }
    });

    localStorage.setItem('tablasDeMedidas', JSON.stringify(tablasDeMedidas));
    alert('Configuración guardada.');
}

function eliminarElemento(fila, elemento, index) {
    fila.remove();
    tablasDeMedidas[elemento].splice(index, 1);
    if (tablasDeMedidas[elemento].length === 0) {
        delete tablasDeMedidas[elemento];
    }
    localStorage.setItem('tablasDeMedidas', JSON.stringify(tablasDeMedidas));
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