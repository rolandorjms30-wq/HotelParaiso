// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

const API_URL = "https://paciencare-api-hpeha7ejgrdwadhw.centralus-01.azurewebsites.net";

// ============================================
// IR AL MENÚ
// ============================================

function irAlMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// ============================================
// MOSTRAR PACIENTES
// ============================================

function mostrarPacientes() {
    const resultado = document.getElementById("resultado");

    if (resultado) {
        resultado.innerHTML = `
            <h3>Pacientes registrados</h3>
            <p>Aquí aparecerá la lista de pacientes crónicos.</p>
        `;
    }
}

// ============================================
// MOSTRAR MEDICAMENTOS
// ============================================

function mostrarMedicamentos() {
    const resultado = document.getElementById("resultado");

    if (resultado) {
        resultado.innerHTML = `
            <h3>Medicamentos</h3>
            <p>Aquí aparecerán los medicamentos asignados a cada paciente.</p>
        `;
    }
}

// ============================================
// MOSTRAR EXÁMENES CLÍNICOS
// ============================================

function mostrarExamenes() {
    const resultado = document.getElementById("resultado");

    if (resultado) {
        resultado.innerHTML = `
            <h3>Exámenes clínicos</h3>
            <p>Aquí aparecerán los exámenes realizados por los pacientes.</p>
        `;
    }
}

// ============================================
// MOSTRAR ESTADO DEL PACIENTE
// ============================================

function mostrarEstado() {
    const resultado = document.getElementById("resultado");

    if (resultado) {
        resultado.innerHTML = `
            <h3>Estado del paciente</h3>
            <p>Consulta si un paciente está activo o inactivo.</p>
        `;
    }
}

// ============================================
// ENVIAR MENSAJE A LA API
// ============================================

async function enviarMensaje(event) {

    // Evitar que el formulario recargue la página
    event.preventDefault();

    // Obtener los campos del formulario
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const mensajeInput = document.getElementById("mensaje");

    // Verificar que existan los campos
    if (!nombreInput || !correoInput || !mensajeInput) {
        alert("Error: no se encontraron los campos del formulario.");
        return;
    }

    // Obtener valores
    const nombre = nombreInput.value.trim();
    const correo = correoInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    // Validar campos
    if (nombre === "" || correo === "" || mensaje === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {

        console.log("Enviando mensaje a la API...");

        const respuesta = await fetch(
            `${API_URL}/api/contactos`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre,
                    correo: correo,
                    mensaje: mensaje
                })
            }
        );

        // Mostrar error si la API responde con error
        if (!respuesta.ok) {

            const textoError = await respuesta.text();

            console.error(
                "Error de la API:",
                respuesta.status,
                textoError
            );

            throw new Error(
                `La API respondió con código ${respuesta.status}`
            );
        }

        // Obtener respuesta de la API
        const datos = await respuesta.json();

        console.log("Respuesta de la API:", datos);

        // Mensaje de éxito
        alert("¡Mensaje enviado correctamente!");

        // Limpiar formulario
        nombreInput.value = "";
        correoInput.value = "";
        mensajeInput.value = "";

    } catch (error) {

        console.error("Error al conectar con la API:", error);

        alert(
            "No se pudo enviar el mensaje.\n\n" +
            "Verifica que la API esté disponible y que CORS esté configurado."
        );
    }
}
