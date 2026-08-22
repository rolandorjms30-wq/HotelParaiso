// URL de la API de PacienCare
const API_URL = "https://paciencare-api-hpeha7ejgrdwadhw.centralus-01.azurewebsites.net";

// Ir al menú
function irAlMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

// Mostrar pacientes
function mostrarPacientes() {
    document.getElementById("resultado").innerHTML = `
        <h3>Pacientes registrados</h3>
        <p>Aquí aparecerá la lista de pacientes crónicos.</p>
    `;
}

// Mostrar medicamentos
function mostrarMedicamentos() {
    document.getElementById("resultado").innerHTML = `
        <h3>Medicamentos</h3>
        <p>Aquí aparecerán los medicamentos asignados a cada paciente.</p>
    `;
}

// Mostrar exámenes clínicos
function mostrarExamenes() {
    document.getElementById("resultado").innerHTML = `
        <h3>Exámenes clínicos</h3>
        <p>Aquí aparecerán los exámenes realizados por los pacientes.</p>
    `;
}

// Mostrar estado del paciente
function mostrarEstado() {
    document.getElementById("resultado").innerHTML = `
        <h3>Estado del paciente</h3>
        <p>Consulta si un paciente está activo o inactivo.</p>
    `;
}

// Enviar mensaje del formulario a la API
async function enviarMensaje(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !correo || !mensaje) {
        alert("Por favor completa todos los campos.");
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/api/contactos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                mensaje: mensaje
            })
        });

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        alert("¡Mensaje enviado correctamente!");

        // Limpiar formulario
        document.getElementById("nombre").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("mensaje").value = "";

        console.log("Respuesta de la API:", datos);

    } catch (error) {
        console.error("Error al enviar:", error);
        alert("No se pudo enviar el mensaje. Revisa la conexión con la API.");
    }
}
