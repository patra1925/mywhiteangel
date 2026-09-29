/* =========================================
   MY WHITE ANGEL
   PHASE 2 — 3D SCROLL EXPERIENCE
========================================= */

/* =========================================
   ALWAYS START FROM TOP ON REFRESH
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    window.scrollTo(0, 0);

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 2200);

});


/* =========================================
   ENTER BUTTON
========================================= */

const enterBtn = document.getElementById("enterBtn");

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        document.querySelector(".intro").scrollIntoView({
            behavior: "smooth"
        });

    });

}


/* =========================================
   3D WAVE CANVAS
========================================= */

const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let time = 0;
let scrollY = 0;
let targetScrollY = 0;


function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* =========================================
   SMOOTH SCROLL VALUE
========================================= */

window.addEventListener(
    "scroll",
    () => {

        targetScrollY = window.scrollY;

    },
    { passive: true }
);


/* =========================================
   WAVE DRAWING
========================================= */

function drawWave(
    amplitude,
    frequency,
    speed,
    verticalPosition,
    opacity,
    scrollInfluence
) {

    ctx.beginPath();

    ctx.moveTo(0, height);

    for (
        let x = 0;
        x <= width;
        x += 5
    ) {

        const wave1 =
            Math.sin(
                x * frequency
                + time * speed
                + scrollY * scrollInfluence
            ) * amplitude;

        const wave2 =
            Math.sin(
                x * frequency * 0.45
                + time * speed * 0.6
                + scrollY * scrollInfluence * 0.5
            ) * amplitude * .45;

        const y =
            verticalPosition
            + wave1
            + wave2;

        ctx.lineTo(x, y);

    }

    ctx.lineTo(width, height);

    ctx.closePath();

    ctx.fillStyle =
        `rgba(255,255,255,${opacity})`;

    ctx.fill();

}


/* =========================================
   WAVE ANIMATION
========================================= */

function animateWaves() {

    scrollY +=
        (targetScrollY - scrollY) * .06;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    drawWave(
        45,
        .006,
        .7,
        height * .68,
        .25,
        .0015
    );


    drawWave(
        65,
        .004,
        -.45,
        height * .78,
        .20,
        -.001
    );


    drawWave(
        35,
        .009,
        .9,
        height * .88,
        .18,
        .002
    );


    time += .012;

    requestAnimationFrame(
        animateWaves
    );

}

animateWaves();


/* =========================================
   HERO 3D MOUSE MOVEMENT
========================================= */

const heroCard =
    document.querySelector(".hero-image-card");


if (
    heroCard &&
    window.matchMedia("(pointer:fine)").matches
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                .5;

            const y =
                event.clientY /
                window.innerHeight -
                .5;


            heroCard.style.transform = `
                rotateY(${-12 + x * 10}deg)
                rotateX(${5 - y * 8}deg)
                translateZ(80px)
            `;

        }
    );

}


/* =========================================
   FLOATING PHOTO ANIMATION
========================================= */

const floatingPhotos =
    document.querySelectorAll(
        ".floating-photo"
    );

let floatTime = 0;


function floatingAnimation() {

    floatTime += .015;


    floatingPhotos.forEach(
        (photo, index) => {

            const movement =
                Math.sin(
                    floatTime * 1.2 +
                    index
                ) * 8;


            const rotation =
                Math.sin(
                    floatTime * .7 +
                    index
                ) * 1.5;


            photo.style.marginTop =
                `${movement}px`;


            photo.style.rotate =
                `${rotation}deg`;

        }
    );


    requestAnimationFrame(
        floatingAnimation
    );

}

floatingAnimation();


/* =========================================
   SCROLL PARALLAX
========================================= */

const parallaxElements =
    document.querySelectorAll(
        ".floating-photo, .memory-card, .gallery-item"
    );


function updateParallax() {

    const viewportCenter =
        window.innerHeight / 2;


    parallaxElements.forEach(
        (element) => {

            const rect =
                element.getBoundingClientRect();


            const elementCenter =
                rect.top +
                rect.height / 2;


            const distance =
                elementCenter -
                viewportCenter;


            const movement =
                distance * -.035;


            const currentTransform =
                element.dataset.baseTransform ||
                getComputedStyle(
                    element
                ).transform;


            element.style.setProperty(
                "--parallax-y",
                `${movement}px`
            );

        }
    );

}


/* =========================================
   REQUEST ANIMATION FRAME PARALLAX
========================================= */

let parallaxTick = false;


window.addEventListener(
    "scroll",
    () => {

        if (!parallaxTick) {

            window.requestAnimationFrame(
                () => {

                    updateParallax();

                    parallaxTick = false;

                }
            );

            parallaxTick = true;

        }

    },
    { passive: true }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .memory-header, .gallery-title, .intro-text, .final-content"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: .2
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   FLOATING PARTICLES
========================================= */

const particleContainer =
    document.createElement("div");

particleContainer.className =
    "particle-container";

document.body.appendChild(
    particleContainer
);


const particleCount =
    window.innerWidth < 768
        ? 18
        : 35;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement("span");


    particle.className =
        "particle";


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.top =
        Math.random() * 100 + "%";


    particle.style.animationDelay =
        Math.random() * 8 + "s";


    particle.style.animationDuration =
        6 +
        Math.random() * 8 +
        "s";


    particle.style.transform =
        `scale(${.4 + Math.random() * .8})`;


    particleContainer.appendChild(
        particle
    );

}


/* =========================================
   TOUCH PARALLAX
========================================= */

let touchStartX = 0;
let touchStartY = 0;


window.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.touches[0].clientX;

        touchStartY =
            event.touches[0].clientY;

    },
    { passive: true }
);


window.addEventListener(
    "touchmove",
    (event) => {

        const x =
            event.touches[0].clientX;

        const y =
            event.touches[0].clientY;


        const differenceX =
            x - touchStartX;


        const differenceY =
            y - touchStartY;


        if (heroCard) {

            const rotateY =
                Math.max(
                    -7,
                    Math.min(
                        7,
                        differenceX / 30
                    )
                );


            const rotateX =
                Math.max(
                    -5,
                    Math.min(
                        5,
                        -differenceY / 40
                    )
                );


            heroCard.style.transform = `
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
            `;

        }

    },
    { passive: true }
);


/* =========================================
   RESET HERO ON TOUCH END
========================================= */

window.addEventListener(
    "touchend",
    () => {

        if (heroCard) {

            heroCard.style.transform = `
                rotateY(-7deg)
                rotateX(3deg)
            `;

        }

    }
);


/* =========================================
   INITIAL PARALLAX
========================================= */

updateParallax();


/* =========================================
   3D PHOTO VIEWER
========================================= */

const viewer =
    document.getElementById("photoViewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerCounter =
    document.getElementById("viewerCounter");

const viewerClose =
    document.getElementById("viewerClose");

const viewerPrev =
    document.getElementById("viewerPrev");

const viewerNext =
    document.getElementById("viewerNext");


/* =========================================
   PHOTO LIST
========================================= */

const photoList = [

    "images/01-closeup.JPG",
    "images/02-closeup.JPG",

    "images/03-fullbody.JPG",
    "images/04-fullbody.JPG",

    "images/05-differentpose.JPG",
    "images/06-differentpose.JPG",

    "images/07-candid.JPG",
    "images/08-candid.JPG",

    "images/09-sideprofile.JPG",
    "images/10-sideprofile.JPG",

    "images/11-fullbody.JPG",

    "images/12-closeup.JPG",

    "images/13-differentpose.JPG",

    "images/14-candid.JPG",

    "images/15-final.JPG"

];


let currentPhoto = 0;


/* =========================================
   OPEN VIEWER
========================================= */

function openViewer(index) {

    currentPhoto = index;

    updateViewer();

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   UPDATE PHOTO
========================================= */

function updateViewer() {

    viewerImage.style.opacity = "0";

    viewerImage.style.transform =
        "scale(.96)";

    setTimeout(() => {

        viewerImage.src =
            photoList[currentPhoto];

        viewerCounter.textContent =
            `${String(currentPhoto + 1).padStart(2, "0")} / ${photoList.length}`;

        viewerImage.onload = () => {

            viewerImage.style.opacity = "1";

            viewerImage.style.transform =
                "scale(1)";

        };

    }, 120);

}


/* =========================================
   CLOSE
========================================= */

function closeViewer() {

    viewer.classList.remove("active");

    document.body.style.overflow = "";

}


viewerClose.addEventListener(
    "click",
    closeViewer
);


/* =========================================
   NEXT
========================================= */

function nextPhoto() {

    currentPhoto++;

    if (
        currentPhoto >=
        photoList.length
    ) {

        currentPhoto = 0;

    }

    updateViewer();

}


viewerNext.addEventListener(
    "click",
    nextPhoto
);


/* =========================================
   PREVIOUS
========================================= */

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {

        currentPhoto =
            photoList.length - 1;

    }

    updateViewer();

}


viewerPrev.addEventListener(
    "click",
    previousPhoto
);


/* =========================================
   CLICK ANY WEBSITE PHOTO
========================================= */

const clickablePhotos =
    document.querySelectorAll(
        ".hero-image-card img, .floating-photo img, .memory-card img, .gallery-item img, .final-image img"
    );


clickablePhotos.forEach(
    (image) => {

        image.style.cursor = "pointer";

        image.addEventListener(
            "click",
            () => {

                const src =
                    image.getAttribute("src");

                const index =
                    photoList.indexOf(src);

                if (index !== -1) {

                    openViewer(index);

                }

            }
        );

    }
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !viewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeViewer();

        }


        if (event.key === "ArrowRight") {

            nextPhoto();

        }


        if (event.key === "ArrowLeft") {

            previousPhoto();

        }

    }
);


/* =========================================
   MOBILE SWIPE
========================================= */

let viewerTouchStartX = 0;
let viewerTouchStartY = 0;


viewer.addEventListener(
    "touchstart",
    (event) => {

        viewerTouchStartX =
            event.touches[0].clientX;

        viewerTouchStartY =
            event.touches[0].clientY;

    },
    { passive: true }
);


viewer.addEventListener(
    "touchend",
    (event) => {

        const endX =
            event.changedTouches[0].clientX;

        const endY =
            event.changedTouches[0].clientY;


        const differenceX =
            endX -
            viewerTouchStartX;


        const differenceY =
            endY -
            viewerTouchStartY;


        if (
            Math.abs(differenceX) >
                50 &&
            Math.abs(differenceX) >
                Math.abs(differenceY)
        ) {

            if (differenceX < 0) {

                nextPhoto();

            } else {

                previousPhoto();

            }

        }

    },
    { passive: true }
);


/* =========================================
   CLICK BACKDROP TO CLOSE
========================================= */

document
    .querySelector(".viewer-backdrop")
    .addEventListener(
        "click",
        closeViewer
    );