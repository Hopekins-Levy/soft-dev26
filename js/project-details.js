/* =========================================================
   HOPEKINS LEVY
   PROJECT DETAILS JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const TOTAL_EPISODES = 7;


/* =========================================================
   PROJECT IMAGES
   ========================================================= */

const PROJECT_IMAGES = [
    {
        src: "assets/images/TSS-1.png",
        title: "Tanzania SDA Services - Screenshot 1"
    },
    {
        src: "assets/images/TSS-2.png",
        title: "Tanzania SDA Services - Screenshot 2"
    }
];


/* =========================================================
   PROJECT EPISODES
   ALL EPISODES ARE PUBLIC / NO LOCK
   ========================================================= */

const PROJECT_EPISODES = [
    {
        number: 1,
        title: "Episode 1",
        description: "Project demonstration - Episode 1",
        src: "assets/videos/TSS Episode 1.mp4",
        available: true
    },

    {
        number: 2,
        title: "Episode 2",
        description: "Project demonstration - Episode 2",
        src: "assets/videos/TSS Episode 2.mp4",
        available: true
    },

    {
        number: 3,
        title: "Episode 3",
        description: "Project demonstration - Episode 3",
        src: "assets/videos/TSS Episode 3.mp4",
        available: true
    },

    {
        number: 4,
        title: "Episode 4",
        description: "Project demonstration - Episode 4",
        src: "assets/videos/TSS Episode 4.mp4",
        available: true
    },

    {
        number: 5,
        title: "Episode 5",
        description: "Project demonstration - Episode 5",
        src: "assets/videos/TSS Episode 5.mp4",
        available: true
    },

    {
        number: 6,
        title: "Episode 6",
        description: "Project demonstration - Episode 6",
        src: "assets/videos/TSS Episode 6.mp4",
        available: true
    },

    {
        number: 7,
        title: "Episode 7",
        description: "Project demonstration - Episode 7",
        src: "assets/videos/TSS Episode 7.mp4",
        available: true
    }
];


/* =========================================================
   PROJECT DATA
   ========================================================= */

const PROJECT_DATA = {

    edutrack: {
        title: "EduTrack Tanzania",

        description:
            "A digital secondary education management system designed to simplify academic assessment, tracking and educational data management.",

        technology: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "PHP",
            "MySQL",
            "MySQLi"
        ]
    },

    "tanzania-sda-services": {
        title: "Tanzania SDA Services",

        description:
            "A digital registration and services management platform designed to support organized member, church and service management.",

        technology: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "PHP",
            "MySQL",
            "MySQLi"
        ]
    }

};


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector) =>
    document.querySelector(selector);


const $$ = (selector) =>
    document.querySelectorAll(selector);


/* =========================================================
   PAGE STATE
   ========================================================= */

let currentImageIndex = 0;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeProject();

        initializeNavigation();

        initializeLightbox();

        initializeFooter();

    }
);


/* =========================================================
   PROJECT INITIALIZATION
   ========================================================= */

function initializeProject() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const projectKey =
        params.get("project");


    const project =
        PROJECT_DATA[projectKey] ||
        PROJECT_DATA["tanzania-sda-services"];


    const title =
        $("#projectTitle");


    const description =
        $("#projectDescription");


    const technology =
        $("#projectTechnology");


    if (title) {

        title.textContent =
            project.title;

    }


    if (description) {

        description.textContent =
            project.description;

    }


    if (technology) {

        technology.textContent =
            project.technology.join(", ");

    }


    renderTechnologies(
        project.technology
    );


    renderImages();

    renderVideos();

}


/* =========================================================
   TECHNOLOGIES
   ========================================================= */

function renderTechnologies(technologies) {

    const container =
        $("#technologyList");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    technologies.forEach(
        (technology) => {

            const item =
                document.createElement("span");


            item.className =
                "tech-item";


            item.textContent =
                technology;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   VIDEOS
   ALL EPISODES 1–7 ARE UNLOCKED
   ========================================================= */

function renderVideos() {

    const container =
        $("#videoGrid");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    PROJECT_EPISODES.forEach(
        (episode) => {

            const card =
                document.createElement("article");


            card.className =
                "video-card";


            card.dataset.episode =
                episode.number;


            card.innerHTML = `

                <div class="video-wrapper">

                    <video
                        controls
                        preload="metadata"
                        playsinline
                        controlsList="nodownload"
                        oncontextmenu="return false;"
                    >

                        <source
                            src="${escapeHTML(episode.src)}"
                            type="video/mp4"
                        >

                        Your browser does not support
                        HTML5 video.

                    </video>

                </div>


                <div class="video-info">

                    <span class="video-status">
                        Available
                    </span>


                    <h3>
                        ${escapeHTML(episode.title)}
                    </h3>


                    <p>
                        ${escapeHTML(
                            episode.description
                        )}
                    </p>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    handleVideoErrors();

}


/* =========================================================
   IMAGES
   ========================================================= */

function renderImages() {

    const container =
        $("#galleryGrid");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    PROJECT_IMAGES
        .slice(0, 2)
        .forEach(
            (image, index) => {

                const item =
                    document.createElement(
                        "button"
                    );


                item.type = "button";


                item.className =
                    "gallery-item";


                item.setAttribute(
                    "aria-label",
                    `Open ${image.title}`
                );


                item.innerHTML = `

                    <img
                        src="${escapeHTML(image.src)}"
                        alt="${escapeHTML(image.title)}"
                        loading="lazy"
                    >

                    <span class="gallery-overlay">

                        <strong>
                            ${escapeHTML(image.title)}
                        </strong>

                    </span>

                `;


                item.addEventListener(
                    "click",
                    () => {

                        openLightbox(index);

                    }
                );


                container.appendChild(
                    item
                );

            }
        );

}


/* =========================================================
   LIGHTBOX
   ========================================================= */

function initializeLightbox() {

    const lightbox =
        $("#imageLightbox");


    const closeButton =
        $("#closeLightbox");


    const previous =
        $("#lightboxPrev");


    const next =
        $("#lightboxNext");


    if (!lightbox) {

        return;

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            showPreviousImage
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            showNextImage
        );

    }


    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPreviousImage();

            }


            if (
                event.key === "ArrowRight"
            ) {

                showNextImage();

            }

        }
    );

}


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openLightbox(index) {

    const lightbox =
        $("#imageLightbox");


    if (!lightbox) {

        return;

    }


    currentImageIndex =
        index;


    updateLightbox();


    lightbox.classList.add(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeLightbox() {

    const lightbox =
        $("#imageLightbox");


    if (!lightbox) {

        return;

    }


    lightbox.classList.remove(
        "active"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   UPDATE LIGHTBOX
   ========================================================= */

function updateLightbox() {

    const image =
        PROJECT_IMAGES[
            currentImageIndex
        ];


    if (!image) {

        return;

    }


    const lightboxImage =
        $("#lightboxImage");


    const download =
        $("#downloadImage");


    if (lightboxImage) {

        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.title;

    }


    if (download) {

        download.href =
            image.src;


        download.setAttribute(
            "download",
            getFilename(image.src)
        );

    }

}


/* =========================================================
   PREVIOUS IMAGE
   ========================================================= */

function showPreviousImage() {

    if (
        PROJECT_IMAGES.length === 0
    ) {

        return;

    }


    currentImageIndex =
        (
            currentImageIndex -
            1 +
            PROJECT_IMAGES.length
        ) %
        PROJECT_IMAGES.length;


    updateLightbox();

}


/* =========================================================
   NEXT IMAGE
   ========================================================= */

function showNextImage() {

    if (
        PROJECT_IMAGES.length === 0
    ) {

        return;

    }


    currentImageIndex =
        (
            currentImageIndex +
            1
        ) %
        PROJECT_IMAGES.length;


    updateLightbox();

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const toggle =
        $("#menuToggle");


    const nav =
        $("#mainNav");


    if (
        !toggle ||
        !nav
    ) {

        return;

    }


    toggle.addEventListener(
        "click",
        () => {

            const active =
                nav.classList.toggle(
                    "active"
                );


            toggle.setAttribute(
                "aria-expanded",
                String(active)
            );

        }
    );


    nav.querySelectorAll("a")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "active"
                        );


                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   FOOTER
   ========================================================= */

function initializeFooter() {

    const year =
        $("#currentYear");


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }

}


/* =========================================================
   VIDEO ERROR HANDLING
   ========================================================= */

function handleVideoErrors() {

    const videos =
        $$("#videoGrid video");


    videos.forEach(
        (video) => {

            video.addEventListener(
                "error",
                () => {

                    const card =
                        video.closest(
                            ".video-card"
                        );


                    if (!card) {

                        return;

                    }


                    const wrapper =
                        card.querySelector(
                            ".video-wrapper"
                        );


                    if (wrapper) {

                        wrapper.innerHTML = `

                            <div class="page-error">

                                This video could not be loaded.

                                Please check the video file path.

                            </div>

                        `;

                    }

                }
            );

        }
    );

}


/* =========================================================
   SECURITY / UTILITY
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   GET FILE NAME
   ========================================================= */

function getFilename(path) {

    return path
        .split("/")
        .pop()
        .split("?")[0];

}


/* =========================================================
   DISABLE RIGHT CLICK ON VIDEOS
   ========================================================= */

document.addEventListener(
    "contextmenu",
    (event) => {

        if (
            event.target.closest(
                "video"
            )
        ) {

            event.preventDefault();

        }

    }
);

