function cuitValido(cuit) {
    if (cuit.length !== 11) {
        return false;
    }

    let digitoVerificador = parseInt(cuit.charAt(10));
    let coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;

    for (var i = 0; i < 10; i++) {
        suma += parseInt(cuit.charAt(i)) * coeficientes[i];
    }

    let resto = suma % 11;
    let resultado = (resto === 0) ? 0 : 11 - resto;

    return resultado === digitoVerificador;
}

function aseguradoCargado(cuit) {
    return arrAsegurados.some((asegurado) => asegurado.cuit === cuit);
}

function esnombreValido(nombre) {
    const nombreValido = /^[a-zA-Z]{3,}\s[a-zA-Z]+$/;
    return nombreValido.test(nombre);
}

function estelefonoValido(telefono) {
    const telefonoValido = /^\([0-9]{3}\)[0-9]+-?[0-9]+$|^[0-9]+-?[0-9]+$/;
    return telefonoValido.test(telefono);
}

function esemailValido(email) {
    const emailValido = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailValido.test(email);
}
let arrAsegurados = [];

var form_asegurado = document.getElementById("form_asegurado")

form_asegurado.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let asegurado = {
        cuit: "",
        nombre: "",
        telefono: "",
        email: ""
    }

    asegurado.cuit = evento.target.cuit.value;
    if (!cuitValido(asegurado.cuit)) {
        alert("Ingrese un cuit valido");
        return;
    }
    asegurado.nombre = evento.target.nombre.value;
    if (!esnombreValido(asegurado.nombre)) {
        alert("Ingrese un nombre completo");
        return;
    }
    asegurado.telefono = evento.target.telefono.value;
    if (!estelefonoValido(asegurado.telefono)) {
        alert("Ingrese un telefono valido");
    }

    asegurado.email = evento.target.email.value;
    if (!esemailValido(asegurado.email)) {
        alert("Ingrese un email correcto");
        return;
    }

    if (aseguradoCargado(asegurado.cuit)) {
        alert("Esta persona ya se cargó");
        return;
    }

    arrAsegurados.push(asegurado);

    actualizarTabla(asegurado.cuit, asegurado.nombre, asegurado.telefono, asegurado.email);
})

function actualizarTabla(cuit, nombre, telefono, email) {
    let tabla = document.querySelector(".info_asegurado");
    if (!tabla.classList.contains("table-bordered")) {
        tabla.classList.add("table-bordered");
    }

    let eltotr = document.createElement("tr");
    tabla.append(eltotr);

    let eltotdCuit = document.createElement("td");
    eltotdCuit.innerText = cuit;
    eltotr.append(eltotdCuit);

    let eltotdNombre = document.createElement("td");
    eltotdNombre.innerText = nombre;
    eltotr.append(eltotdNombre);

    let eltotdTelefono = document.createElement("td");
    eltotdTelefono.innerText = telefono;
    eltotr.append(eltotdTelefono);

    let eltotdEmail = document.createElement("td");
    eltotdEmail.innerText = email;
    eltotr.append(eltotdEmail);
}

// Autocompletar los campos con CUIT
document.getElementById("cuit").addEventListener("change", function (evento) {
    let asegurado = {
        cuit: "",
        nombre: "",
        telefono: "",
        email: ""
    }

    asegurado.cuit = evento.target.value;
    let indice = obtenerIndiceAsegurado(asegurado.cuit);


    if (indice != -1) {
        completarAsegurado(indice);
    }
})

function obtenerIndiceAsegurado(cuit) {
    return arrAsegurados.findIndex((asegurado) => asegurado.cuit === cuit);
}

function completarAsegurado(indice) {
    document.getElementById("nombre").value = arrAsegurados[indice].nombre;
    document.getElementById("telefono").value = arrAsegurados[indice].telefono;
    document.getElementById("email").value = arrAsegurados[indice].email;
}

// Autos

// Verificacion patente
function esPatenteValida(patente) {
    const patenteVieja = /^[A-Z]{3}\s\d{3}$/;
    const patenteNueva = /^[A-Z]{2}\s\d{3}\s[A-Z]{2}$/;

    return patenteVieja.test(patente) || patenteNueva.test(patente);
}

function autoCargado(patente) {
    return arrAuto.some((auto) => auto.patente.toUpperCase() === patente.toUpperCase());
}

let arrAuto = [];

var form_auto = document.getElementById("form_auto");

form_auto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let auto = {
        patente: "",
        tipo: "",
        anio: "",
        marca: "",
        modelo: "",
        gnc: "",
        observaciones: "",
        asegurado_cuit: ""
    }

    auto.asegurado_cuit = document.getElementById("cuit").value;
    if (!aseguradoCargado(auto.asegurado_cuit)) {
        alert("Por favor ingrese un cliente asegurado.");
        return;
    }

    auto.patente = evento.target.patente.value;
    if (!esPatenteValida(auto.patente.toUpperCase())) {
        alert("La patente no es correcta, ingrese nuevamente.");
        return;
    }

    auto.tipo = evento.target.querySelector('input[name="tipo"]:checked').value;
    auto.anio = evento.target.anio.value;
    auto.marca = evento.target.marca.value;
    auto.modelo = evento.target.modelo.value;
    let gncCheck = evento.target.querySelector('input[name="gnc"]:checked');
    auto.gnc = gncCheck ? gncCheck.value : "No";
    auto.observaciones = evento.target.observaciones.value;

    // Verificar si ya está cargado
    if (autoCargado(auto.patente)) {
        alert("El auto ya fue cargado.");
        return;
    }

    // Cargar en el array
    arrAuto.push(auto);

    let tabla = document.querySelector(".info_auto");
    let eltotr = document.createElement("tr");
    tabla.append(eltotr);

    let eltotdPatente = document.createElement("td");
    eltotdPatente.innerText = auto.patente;
    eltotr.append(eltotdPatente);

    let eltotdAsegurado_cuit = document.createElement("td");
    eltotdAsegurado_cuit.innerText = auto.asegurado_cuit;
    eltotr.append(eltotdAsegurado_cuit);

    let eltotdTipo = document.createElement("td");
    eltotdTipo.innerText = auto.tipo;
    eltotr.append(eltotdTipo);

    let eltotdAnio = document.createElement("td");
    eltotdAnio.innerText = auto.anio;
    eltotr.append(eltotdAnio);

    let eltotdMarca = document.createElement("td");
    eltotdMarca.innerText = auto.marca;
    eltotr.append(eltotdMarca);

    let eltotdModelo = document.createElement("td");
    eltotdModelo.innerText = auto.modelo;
    eltotr.append(eltotdModelo);

    let eltotdGnc = document.createElement("td");
    eltotdGnc.innerText = auto.gnc;
    eltotr.append(eltotdGnc);

    let eltotdObservaciones = document.createElement("td");
    eltotdObservaciones.innerText = auto.observaciones;
    eltotr.append(eltotdObservaciones);

    console.log('ArrAuto: ', arrAuto);

})

// Autocompletar los campos con patente
document.getElementById("patente").addEventListener("change", function (evento) {
    let auto = {
        patente: "",
        tipo: "",
        anio: "",
        marca: "",
        modelo: "",
        gnc: "",
        observaciones: "",
        asegurado_cuit: ""
    }

    auto.patente = evento.target.value;

    if (autoCargado(auto.patente)) {
        let indice = obtenerIndiceAuto(auto.patente);
        resetearFormulario();
        completarAuto(indice);
    }
})

function resetearFormulario() {
    document.getElementById("form_auto").reset();
}

function obtenerIndiceAuto(patente) {
    return arrAuto.findIndex((auto) => auto.patente === patente);
}

function completarAuto(indice) {
    document.querySelector('input[name="tipo"][value="' + arrAuto[indice].tipo + '"]').checked = true;
    document.getElementById("anio").value = arrAuto[indice].anio;
    document.getElementById("marca").value = arrAuto[indice].marca;
    document.getElementById("modelo").value = arrAuto[indice].modelo;
    let gncCheck = document.querySelector('input[name="gnc"]');
    gncCheck.checked = arrAuto[indice].gnc === "Sí";
    document.getElementById("observaciones").value = arrAuto[indice].observaciones;
}

document.getElementById("bResetear").addEventListener("click", function () {
    document.getElementById("form_auto").reset();
    cargarModelos();
})

document.getElementById("marca").addEventListener("input", cargarModelos);

function cargarModelos() {
    document.getElementById("modelo").innerHTML = "";
    let modelos;
    switch (document.getElementById("marca").value) {
        case 'Chevrolet':
            modelos = ["Meriva", "Tracker", "Camaro", "Cruze"];
            break;
        case 'Nissan':
            modelos = ["Sentra", "Frontier", "X-Strall", "Versa"];
            break;
        case 'Ford':
            modelos = ["Bronco", "Ranger", "EcoSport", "Fiesta"]
            break;
        case 'Renault':
            modelos = ["Sandero", "Logan", "Kangoo", "Duster"];
            break;
        case 'Peugeot':
            modelos = ["208", "206", "Partner", "2008"];
            break;
        case 'Volkswagen':
            modelos = ["Suran", "Gol", "Golf", "Amarok"];
            break;
    }

    let cbModelo = document.getElementById("modelo");

    modelos.forEach(modelo => {
        let option = document.createElement("option");
        option.value = modelo;
        option.text = modelo;
        cbModelo.append(option);
    })
}

document.addEventListener("DOMContentLoaded", function () {
    cargarModelos();
});

// Consultas
function buscarAutoxcuit(cuit) {
    console.log('ArrAuto: ', arrAuto);
    const autoAsociado = arrAuto.filter(auto => auto.asegurado_cuit === cuit);

    const listaAutos = document.getElementById("lista_consulta");
    listaAutos.innerHTML = '';

    if (autoAsociado.length > 0) {
        document.getElementById('cuit_asociado_consulta').innerText = cuit;

        autoAsociado.forEach(auto => {
            console.log("hola hola");
            const eltoli = document.createElement('li');
            eltoli.textContent = `Patente: ${auto.patente} - Año: ${auto.anio} - Tipo: ${auto.tipo} - Marca: ${auto.marca} - Modelo: ${auto.modelo} - GNC: ${auto.gnc === 'Sí' ? 'Sí' : 'No'} - Observaciones: ${auto.observaciones}`;
            listaAutos.appendChild(eltoli);
        })
    } else {
        document.getElementById('cuit_asociado_consulta').innerText = 'Este cliente no tiene autos asegurados';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bBuscar').addEventListener('click', function () {
        const cuitBuscado = document.querySelector('[name="busqueda_cuit"]').value;
        buscarAutoxcuit(cuitBuscado);
    });
});