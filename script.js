


/* ============================================================
   MENÚ MÓVIL
============================================================ */

const menuBtn =
document.getElementById("menuBtn");

const nav =
document.getElementById("nav");


menuBtn.addEventListener(
"click",
() => {

    nav.classList.toggle("open");

    menuBtn.textContent =
    nav.classList.contains("open")
    ? "✕"
    : "☰";

});


document
.querySelectorAll(".nav a")
.forEach(link => {

    link.addEventListener(
    "click",
    () => {

        nav.classList.remove("open");

        menuBtn.textContent =
        "☰";

    });

});


/* ============================================================
   HEADER AL HACER SCROLL
============================================================ */

const header =
document.getElementById("header");


window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 40){

        header.classList.add(
        "scrolled");

    }else{

        header.classList.remove(
        "scrolled");

    }

});


/* ============================================================
   BARRA DE PROGRESO
============================================================ */

const progress =
document.getElementById("progress");


function updateProgress(){

    const scrollTop =
    window.scrollY;

    const height =
    document.documentElement.scrollHeight
    -
    window.innerHeight;

    const percent =
    height > 0
    ? (scrollTop / height) * 100
    : 0;

    progress.style.width =
    percent + "%";

}


window.addEventListener(
"scroll",
updateProgress,
{passive:true}
);


/* ============================================================
   ANIMACIONES AL DESPLAZARSE
============================================================ */

const revealElements =
document.querySelectorAll(".reveal");


const revealObserver =
new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target
                .classList
                .add("visible");

                revealObserver
                .unobserve(
                entry.target);

            }

        });

    },

    {
        threshold:.12
    }

);


revealElements.forEach(
element => {

    revealObserver
    .observe(element);

});


/* ============================================================
   CONTADORES
============================================================ */

const counters =
document.querySelectorAll(
".counter"
);

let countersStarted =
false;


function startCounters(){

    if(countersStarted)
    return;

    countersStarted =
    true;


    counters.forEach(
    counter => {

        const target =
        Number(
        counter.dataset.target
        );

        let current = 0;

        const duration =
        1600;

        const step =
        target /
        (duration / 20);


        const timer =
        setInterval(
        () => {

            current += step;


            if(current >= target){

                counter.textContent =
                target +
                (
                    target === 100
                    ? "%"
                    : "+"
                );

                clearInterval(timer);

            }else{

                counter.textContent =
                Math.floor(current);

            }

        },20);

    });

}


const stats =
document.querySelector(
".stats-box"
);


if(stats){

    const statsObserver =
    new IntersectionObserver(

        entries => {

            if(
            entries[0]
            .isIntersecting
            ){

                startCounters();

                statsObserver.disconnect();

            }

        },

        {
            threshold:.3
        }

    );

    statsObserver.observe(stats);

}


/* ============================================================
   BOTÓN VOLVER ARRIBA
============================================================ */

const topButton =
document.getElementById(
"topButton"
);


window.addEventListener(
"scroll",
() => {

    if(window.scrollY > 600){

        topButton
        .classList
        .add("show");

    }else{

        topButton
        .classList
        .remove("show");

    }

});


topButton.addEventListener(
"click",
() => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/* ============================================================
   NAVEGACIÓN ACTIVA — PÁGINAS SEPARADAS
============================================================ */

const navLinks =
document.querySelectorAll(
".nav a"
);

function updateActiveNav(){

    const file =
    window.location.pathname
    .split("/")
    .pop() || "index.html";

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
        link.getAttribute("href");

        const hrefFile = href
        ? href.split("#")[0].split("/").pop()
        : "";

        if(hrefFile === file){

            link.classList.add("active");

        }

    });

}

window.addEventListener(
"scroll",
updateActiveNav,
{passive:true}
);


/* ============================================================
   PANTALLA DE CONTACTO (overlay)
============================================================ */

const contactOverlay =
document.getElementById("contacto");

const body =
document.body;

let lastFocusedElement = null;


function openContactModal(event){

    if(event){

        event.preventDefault();

    }

    lastFocusedElement =
    document.activeElement;

    if(!contactOverlay) return;

    contactOverlay.classList.add("active");

    body.classList.add("contact-open");


    contactOverlay
    .querySelectorAll(".reveal")
    .forEach(el => {

        el.classList.add("visible");

    });


    const closeBtn =
    contactOverlay.querySelector(".contact-close");

    if(closeBtn){

        closeBtn.focus();

    }

}


function closeContactModal(){

    if(!contactOverlay) return;

    contactOverlay.classList.remove("active");

    body.classList.remove("contact-open");


    if(lastFocusedElement){

        lastFocusedElement.focus();

    }

}


document
.querySelectorAll(".js-open-contact")
.forEach(trigger => {

    trigger.addEventListener(
    "click",
    openContactModal
    );

});


document
.querySelectorAll(".js-close-contact")
.forEach(trigger => {

    trigger.addEventListener(
    "click",
    closeContactModal
    );

});


document.addEventListener(
"keydown",
event => {

    if(
    event.key === "Escape" &&
    contactOverlay.classList.contains("active")
    ){

        closeContactModal();

    }

});


if(window.location.hash === "#contacto"){

    openContactModal();

}


/* ============================================================
   FORMULARIO → WHATSAPP
============================================================ */

const form =
document.getElementById(
"contactForm"
);


const toast =
document.getElementById(
"toast"
);


if(form){

form.addEventListener(
"submit",
event => {

    event.preventDefault();


    const nombre =
    document
    .getElementById("nombre")
    .value
    .trim();


    const telefono =
    document
    .getElementById("telefono")
    .value
    .trim();


    const email =
    document
    .getElementById("email")
    .value
    .trim();


    const mensaje =
    document
    .getElementById("mensaje")
    .value
    .trim();


    const text =
    "Hola, Corporación Grupo Ibiza.\n\n" +

    "Nueva consulta desde la página web.\n\n" +

    "Nombre: " +
    nombre +

    "\nTeléfono: " +
    telefono +

    "\nEmail: " +
    email +

    "\nMensaje: " +
    mensaje;


    const url =
    "https://api.whatsapp.com/send/?phone=%2B51949587942&text="
    +
    encodeURIComponent(text);


    toast.classList.add(
    "show"
    );


    setTimeout(
    () => {

        toast.classList.remove(
        "show"
        );

        window.open(
        url,
        "_blank"
        );

        form.reset();

        closeContactModal();

    },
    700
    );

});

}


/* ============================================================
   PARALLAX DEL HERO
============================================================ */

const hero =
document.querySelector(
".hero"
);


window.addEventListener(
"scroll",
() => {

    const scroll =
    window.scrollY;


    if(
    scroll < 700 &&
    hero
    ){

        hero.style.backgroundPosition =
        "center " +
        (scroll * .25) +
        "px";

    }

});


/* ============================================================
   EFECTO 3D EN TARJETAS
============================================================ */

document
.querySelectorAll(
".service, .benefit"
)
.forEach(
card => {


    card.addEventListener(
    "mousemove",
    event => {


        const rect =
        card.getBoundingClientRect();


        const x =
        event.clientX -
        rect.left;


        const y =
        event.clientY -
        rect.top;


        const rotateX =
        ((y / rect.height) - .5)
        * -4;


        const rotateY =
        ((x / rect.width) - .5)
        * 4;


        card.style.transform =
        "perspective(800px) " +

        "rotateX(" +
        rotateX +
        "deg) " +

        "rotateY(" +
        rotateY +
        "deg) " +

        "translateY(-8px)";

    });


    card.addEventListener(
    "mouseleave",
    () => {

        card.style.transform =
        "";

    });

});


/* ============================================================
   CARRUSEL "COVERFLOW" DE PROYECTOS
   La imagen central se muestra a tamaño completo; las de los
   lados se reducen progresivamente. Se navega con las flechas,
   los puntos, arrastrando (mouse o touch), o automáticamente.
============================================================ */

const projectCarousel =
document.querySelector(
".project-carousel"
);

const projectSlider =
document.querySelector(
".project-slider"
);

const projectCards =
projectSlider
?
Array.from(
    projectSlider.querySelectorAll(
    ".project"
    )
)
:
[];


if(projectCarousel && projectSlider && projectCards.length){

    const dotsWrap =
    document.querySelector(
    ".project-dots"
    );

    const prevBtn =
    projectCarousel.querySelector(
    ".project-nav.prev"
    );

    const nextBtn =
    projectCarousel.querySelector(
    ".project-nav.next"
    );

    const total = projectCards.length;
    let current = 0;
    let cardWidth = 0;

    // Cuánto se desplaza (en fracción del ancho de la tarjeta) y
    // cómo se escala/atenúa cada posición según su distancia al centro.
    const layout = [
        {x:0,     scale:1,    opacity:1,    z:5, blur:0},
        {x:0.62,  scale:0.8,  opacity:0.75, z:4, blur:1},
        {x:1.08,  scale:0.62, opacity:0.4,  z:3, blur:2},
        {x:1.42,  scale:0.5,  opacity:0,    z:2, blur:2}
    ];

    function measure(){

        cardWidth =
        projectCards[0].getBoundingClientRect().width;

    }

    function buildDots(){

        if(!dotsWrap)
        return;

        dotsWrap.innerHTML = "";

        for(let i = 0; i < total; i++){

            const dot =
            document.createElement(
            "button"
            );

            dot.type = "button";
            dot.className = "project-dot";
            dot.setAttribute(
            "aria-label",
            "Ir al proyecto " + (i + 1)
            );

            dot.addEventListener(
            "click",
            () => goTo(i)
            );

            dotsWrap.appendChild(dot);

        }

    }

    function updateDots(){

        if(!dotsWrap)
        return;

        Array.from(
        dotsWrap.children
        ).forEach(
        (dot, i) => {

            dot.classList.toggle(
            "active",
            i === current
            );

        });

    }

    function render(){

        projectCards.forEach(
        (card, i) => {

            let diff = i - current;

            if(diff > total / 2)
            diff -= total;

            if(diff < -total / 2)
            diff += total;

            const abs = Math.abs(diff);
            const step =
            layout[
            Math.min(
            abs,
            layout.length - 1
            )
            ];

            const translateX =
            diff * step.x * cardWidth;

            card.style.transform =
            "translateX(" +
            translateX +
            "px) scale(" +
            step.scale +
            ")";

            card.style.opacity =
            step.opacity;

            card.style.zIndex =
            step.z;

            card.style.filter =
            step.blur
            ?
            "blur(" + step.blur + "px)"
            :
            "none";

            card.style.pointerEvents =
            abs > 2
            ?
            "none"
            :
            "auto";

            card.classList.toggle(
            "is-center",
            diff === 0
            );

        });

        updateDots();

    }

    function goTo(index){

        current =
        ((index % total) + total) % total;

        render();

    }

    function next(){

        goTo(current + 1);

    }

    function prev(){

        goTo(current - 1);

    }

    if(prevBtn){

        prevBtn.addEventListener(
        "click",
        () => {

            prev();
            pauseAutoplay();

        });

    }

    if(nextBtn){

        nextBtn.addEventListener(
        "click",
        () => {

            next();
            pauseAutoplay();

        });

    }

    projectCards.forEach(
    (card, i) => {

        card.addEventListener(
        "click",
        (e) => {

            if(dragMoved)
            return;

            if(i !== current){

                e.preventDefault();
                goTo(i);
                pauseAutoplay();

            }

        });

    });

    /* ---------- arrastre con mouse y touch ---------- */

    let isDragging = false;
    let dragStartX = 0;
    let dragDelta = 0;
    let dragMoved = false;

    function dragStart(x){

        isDragging = true;
        dragMoved = false;
        dragStartX = x;
        dragDelta = 0;
        projectSlider.classList.add(
        "dragging"
        );

        pauseAutoplay();

    }

    function dragMove(x){

        if(!isDragging)
        return;

        dragDelta = x - dragStartX;

        if(Math.abs(dragDelta) > 5)
        dragMoved = true;

        const preview =
        (dragDelta / cardWidth) * -1;

        projectCards.forEach(
        (card, i) => {

            let diff = i - current + preview;

            if(diff > total / 2)
            diff -= total;

            if(diff < -total / 2)
            diff += total;

            const abs = Math.abs(diff);
            const step =
            layout[
            Math.min(
            Math.round(abs),
            layout.length - 1
            )
            ];

            const translateX =
            diff * step.x * cardWidth;

            card.style.transform =
            "translateX(" +
            translateX +
            "px) scale(" +
            step.scale +
            ")";

            card.style.opacity =
            step.opacity;

        });

    }

    function dragEnd(){

        if(!isDragging)
        return;

        isDragging = false;

        projectSlider.classList.remove(
        "dragging"
        );

        const threshold = cardWidth * 0.15;

        if(dragDelta < -threshold){

            next();

        }else if(dragDelta > threshold){

            prev();

        }else{

            render();

        }

        dragDelta = 0;

        resumeAutoplay();

    }

    projectSlider.addEventListener(
    "mousedown",
    (e) => {

        dragStart(e.clientX);

    });

    window.addEventListener(
    "mousemove",
    (e) => {

        dragMove(e.clientX);

    });

    window.addEventListener(
    "mouseup",
    () => {

        dragEnd();

    });

    projectSlider.addEventListener(
    "touchstart",
    (e) => {

        dragStart(
        e.touches[0].clientX
        );

    },
    {passive:true}
    );

    projectSlider.addEventListener(
    "touchmove",
    (e) => {

        dragMove(
        e.touches[0].clientX
        );

    },
    {passive:true}
    );

    projectSlider.addEventListener(
    "touchend",
    () => {

        dragEnd();

    });

    /* ---------- autoplay ---------- */

    let autoplayTimer = null;

    function startAutoplay(){

        stopAutoplay();

        autoplayTimer =
        setInterval(
        () => {

            next();

        },
        4500
        );

    }

    function stopAutoplay(){

        if(autoplayTimer){

            clearInterval(
            autoplayTimer
            );

            autoplayTimer = null;

        }

    }

    function pauseAutoplay(){

        stopAutoplay();

    }

    function resumeAutoplay(){

        startAutoplay();

    }

    projectCarousel.addEventListener(
    "mouseenter",
    stopAutoplay
    );

    projectCarousel.addEventListener(
    "mouseleave",
    () => {

        if(!isDragging)
        startAutoplay();

    });

    /* ---------- inicio ---------- */

    measure();
    buildDots();
    render();
    startAutoplay();

    window.addEventListener(
    "resize",
    () => {

        measure();
        render();

    });

}


/* ============================================================
   BOTONES DE SERVICIOS
============================================================ */

document
.querySelectorAll(
".service"
)
.forEach(
card => {

    card.style.cursor =
    "default";

});


/* ============================================================
   INICIALIZACIÓN
============================================================ */

updateProgress();

updateActiveNav();




/* ============================================================
   VISOR DE DOCUMENTOS PDF
============================================================ */

const pdfModal =
document.getElementById(
"pdfModal"
);

const pdfViewer =
document.getElementById(
"pdfViewer"
);

const pdfModalTitle =
document.getElementById(
"pdfModalTitle"
);

const pdfModalClose =
document.getElementById(
"pdfModalClose"
);

let lastDocumentButton =
null;

function closePdfModal(){

    if(!pdfModal)
    return;

    pdfModal
    .classList
    .remove("open");

    pdfModal
    .setAttribute(
    "aria-hidden",
    "true"
    );

    document.body
    .classList
    .remove("pdf-modal-open");

    if(pdfViewer){

        pdfViewer.src =
        "";

    }

    if(lastDocumentButton){

        lastDocumentButton.focus();

    }

}

if(pdfModal && pdfViewer && pdfModalTitle){

    document
    .querySelectorAll(
    ".document-viewer-btn"
    )
    .forEach(
    button => {

        button.addEventListener(
        "click",
        () => {

            lastDocumentButton =
            button;

            pdfModalTitle.textContent =
            button.dataset.title ||
            "Documento";

            pdfViewer.src =
            button.dataset.pdf + "#view=FitH";

            pdfModal
            .classList
            .add("open");

            pdfModal
            .setAttribute(
            "aria-hidden",
            "false"
            );

            document.body
            .classList
            .add("pdf-modal-open");

            pdfModalClose.focus();

        });

    });

    pdfModalClose.addEventListener(
    "click",
    closePdfModal
    );

    pdfModal.addEventListener(
    "click",
    event => {

        if(event.target === pdfModal){

            closePdfModal();

        }

    });

    document.addEventListener(
    "keydown",
    event => {

        if(
        event.key === "Escape" &&
        pdfModal.classList.contains("open")
        ){

            closePdfModal();

        }

    });

}


/* ============================================================
   BURBUJA AUTOMÁTICA DE WHATSAPP
============================================================ */

window.addEventListener("load", () => {

    const popup = document.getElementById("whatsappPopup");
    const closeBtn = document.getElementById("whatsappPopupClose");

    if(!popup) return;

    let hideTimer;

    const hidePopup = () => {

        popup.classList.remove("show");

        clearTimeout(hideTimer);

    };

    setTimeout(() => {

        popup.classList.add("show");

        hideTimer = setTimeout(hidePopup, 5000);

    }, 1500);

    if(closeBtn){

        closeBtn.addEventListener("click", hidePopup);

    }

});


document.addEventListener("DOMContentLoaded", () => {

    const tooltip = document.getElementById("oeceTooltip");

    const icons = document.getElementById("topbarIcons");

    if(!tooltip || !icons) return;

    const VISIBLE_MS = 8000;

    const INTERVAL_MS = 20000;

    let hideTimer;

    const showMessage = () => {

        const shift = tooltip.offsetWidth + 10;

        icons.style.transform = `translateX(-${shift}px)`;

        tooltip.classList.add("show");

        clearTimeout(hideTimer);

        hideTimer = setTimeout(() => {

            tooltip.classList.remove("show");

            icons.style.transform = "";

        }, VISIBLE_MS);

    };

    setTimeout(showMessage, 2500);

    setInterval(showMessage, INTERVAL_MS);

});

