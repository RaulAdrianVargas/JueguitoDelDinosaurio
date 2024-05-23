let personaje = document.getElementById("personaje");
let enemigo = document.getElementById("enemigo");
let game = document.getElementById("game");
let perderInterval; // Variable para almacenar el intervalo de verificación de colisión

// Función para que el personaje salte
function jump() {
    if (!personaje.classList.contains("animate")) {
        personaje.classList.add("animate");
    }
    setTimeout(function() {
        personaje.classList.remove("animate");
    }, 500);
}

// Agregar evento de clic en el body para el salto del personaje
document.body.addEventListener("click", function(event) {
    // Verificar si el clic ocurrió dentro del contenedor #game antes de activar el salto
    if (event.target.closest('#game')) {
        jump();
    }
});

// Función para detectar colisión y perder el juego
function detectarColision() {
    let personajeRect = personaje.getBoundingClientRect();
    let enemigoRect = enemigo.getBoundingClientRect();

    // Detectar colisión cuando los elementos se tocan
    if (
        personajeRect.right >= enemigoRect.left &&
        personajeRect.left <= enemigoRect.right &&
        personajeRect.bottom >= enemigoRect.top &&
        personajeRect.top <= enemigoRect.bottom
    ) {
        clearInterval(perderInterval); // Detener la verificación de colisión
        enemigo.style.animation = "none";
        enemigo.style.display = "none";
        alert("¡Perdiste! :c");
    }
}

// Verificar colisión en intervalos regulares y almacenar el intervalo en perderInterval
perderInterval = setInterval(detectarColision, 10);
