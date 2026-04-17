// 🔥 ESPERAR A QUE TODO EL DOM CARGUE
document.addEventListener("DOMContentLoaded", () => {

const audio = document.getElementById("musica");
const btn = document.getElementById("audioBtn");

// Bloquear scroll inicial
document.body.classList.add("no-scroll");

/* ================= AUDIO ================= */
function toggleAudio() {
    if (!audio) return;

    if (audio.paused) {
        audio.play().catch(() => {});
        if (btn) btn.textContent = "🔊";
    } else {
        audio.pause();
        if (btn) btn.textContent = "🔇";
    }
}
window.toggleAudio = toggleAudio;

/* ================= ABRIR INVITACIÓN ================= */
function abrirInvitacion() {

    console.log("click funcionando");

    const tapa = document.querySelector(".tapa");
    const carta = document.querySelector(".carta");
    const sobre = document.querySelector(".sobre");
    const pantalla = document.getElementById("pantallaFinal");

    // Validaciones (para evitar que todo truene)
    if (!pantalla) {
        console.error("No existe pantallaFinal");
        return;
    }

    // Animación
    if (tapa) tapa.style.transform = "rotateX(-180deg)";
    if (carta) carta.style.transform = "translateY(-30px)";

    setTimeout(() => {

        if (sobre) sobre.style.display = "none";

        document.body.classList.remove("no-scroll");

        pantalla.classList.remove("oculto");

        setTimeout(() => {
            pantalla.classList.add("visible");
        }, 50);

        window.scrollTo(0, 0);

        // 🔥 audio seguro
        if (audio) {
            audio.play().catch(() => {});
        }

        if (btn) btn.textContent = "🔊";

        iniciarContadorDias();

    }, 600);
}
window.abrirInvitacion = abrirInvitacion;

/* ================= PARTÍCULAS ================= */
const contenedor = document.getElementById("particulas");

if (contenedor) {
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.classList.add("particula");
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = (5 + Math.random() * 5) + "s";
        contenedor.appendChild(p);
    }
}

/* ================= SCROLL ANIMACIONES ================= */
const elementos = document.querySelectorAll(".ocultoScroll");

function mostrarElementos() {
    const trigger = window.innerHeight * 0.85;

    elementos.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("mostrar");
        }
    });
}

window.addEventListener("scroll", mostrarElementos);
mostrarElementos();

/* ================= CONTADOR ================= */
function iniciarContadorDias() {

    const fechaEvento = new Date("July 04, 2026 18:00:00").getTime();

    function actualizar() {

        const ahora = new Date().getTime();
        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) return;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
        const segundos = Math.floor((diferencia / 1000) % 60);

        const d = document.getElementById("dias");
        const h = document.getElementById("horas");
        const m = document.getElementById("minutos");
        const s = document.getElementById("segundos");

        if (d) d.textContent = dias;
        if (h) h.textContent = horas;
        if (m) m.textContent = minutos;
        if (s) s.textContent = segundos;
    }

    actualizar();
    setInterval(actualizar, 1000);
}

/* ================= CARRUSEL ================= */
let index = 0;

function moverSlide(direccion) {
    const slides = document.getElementById("slides");
    if (!slides) return;

    const total = slides.children.length;

    index += direccion;

    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(() => {
    moverSlide(1);
}, 4000);

window.moverSlide = moverSlide;

/* ================= ANIMACIÓN SECCIONES ================= */
function animarSecciones() {

    const secciones = document.querySelectorAll(".seccion");

    secciones.forEach(seccion => {

        const rect = seccion.getBoundingClientRect();
        const trigger = window.innerHeight * 0.85;

        if (rect.top < trigger && !seccion.classList.contains("animada")) {

            seccion.classList.add("animada");

            const elementos = seccion.querySelectorAll(
                "h1, h2, h3, p, img, a, button, .icono, .linea, span"
            );

            elementos.forEach((el, i) => {
                el.classList.add("anim-item");

                setTimeout(() => {
                    el.classList.add("mostrar");
                }, i * 120);
            });
        }
    });
}

window.addEventListener("scroll", animarSecciones);

});

// scroll
const indicador = document.getElementById("scrollIndicator");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50 && indicador) {
    indicador.style.opacity = "0";
    indicador.style.pointerEvents = "none";
  }
});