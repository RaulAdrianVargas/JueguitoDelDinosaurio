let personaje = document.getElementById("personaje");
let enemigo = document.getElementById("enemigo");
let game = document.getElementById("game");
let perderInterval;

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

    // Ajustar la hitbox del personaje
    let personajeHitbox = {
        left: personajeRect.left + 70,
        top: personajeRect.top + 10,
        right: personajeRect.left + 128 - 50,
        bottom: personajeRect.top + 128 - 10
    };

    // Logs de depuración
    console.log("Personaje Hitbox:", personajeHitbox);
    console.log("Enemigo Rect:", enemigoRect);

    // Detectar colisión cuando los elementos se tocan
    if (
        personajeHitbox.right >= enemigoRect.left &&
        personajeHitbox.left <= enemigoRect.right &&
        personajeHitbox.bottom >= enemigoRect.top &&
        personajeHitbox.top <= enemigoRect.bottom
    ) {
        clearInterval(perderInterval); // Detener la verificación de colisión
        enemigo.style.animation = "none";
        enemigo.style.display = "none";
        alert("¡Perdiste! :c");
    }
}

// Verificar colisión en intervalos más cortos
perderInterval = setInterval(detectarColision, 10);
