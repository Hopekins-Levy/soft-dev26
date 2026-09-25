/* =========================================================
   HOPEKINS LEVY
   PROJECT DETAILS JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const ACCESS_CODE = "DEMO2026";

const AVAILABLE_EPISODES = 5;
const TOTAL_EPISODES = 7;


/*
 * Keep exactly TWO images.
 *
 * Change only these filenames if your actual image filenames
 * are different.
 */
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


/*
 * Episodes 1–5 are available.
 * Episodes 6–7 intentionally have no playable video source.
 */
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
        description: "This episode is still under development.",
        src: "",
        available: false
    },

    {
        number: 7,
        title: "Episode 7",
        description: "This episode is still under development.",
        src: "",
        available: false
    }
];


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

let videosUnlocked = false;

let currentImageIndex = 0;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeProject();

        initializeNavigation();

        initializeAccessModal();

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

            if (episode.available) {

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

            } else {

                card.className =
                    "video-card coming-soon";

                card.innerHTML = `
                    <div class="coming-soon-content">

                        <div class="coming-soon-icon">
                            🚧
                        </div>

                        <span class="video-status">
                            Coming Soon
                        </span>

                        <h3>
                            ${escapeHTML(episode.title)}
                        </h3>

                        <p>
                            This episode is not available yet.
                            It is still under development and
                            will be added when completed.
                        </p>

                    </div>
                `;

            }

            container.appendChild(card);

        }
    );


    /*
     * Videos remain visually present but are protected until
     * the user enters the correct access code.
     */
    lockVideos();

}


/* =========================================================
   VIDEO ACCESS
   ========================================================= */

function lockVideos() {

    const videos =
        $$("#videoGrid video");

    videos.forEach(
        (video) => {

            video.pause();

            video.removeAttribute(
                "controls"
            );

            video.classList.add(
                "video-locked"
            );

        }
    );

}


function unlockVideos() {

    const videos =
        $$("#videoGrid video");

    videos.forEach(
        (video) => {

            video.setAttribute(
                "controls",
                ""
            );

            video.classList.remove(
                "video-locked"
            );

        }
    );

    videosUnlocked = true;

}


/* =========================================================
   ACCESS MODAL
   ========================================================= */

function initializeAccessModal() {

    const modal =
        $("#accessModal");

    const openButton =
        $("#openAccessModal");

    const closeButton =
        $("#closeAccessModal");

    const form =
        $("#accessForm");

    const input =
        $("#accessCode");

    const toggle =
        $("#togglePassword");


    if (
        !modal ||
        !openButton ||
        !closeButton ||
        !form ||
        !input
    ) {
        return;
    }


    openButton.addEventListener(
        "click",
        () => {

            openModal(modal);

            setTimeout(
                () => input.focus(),
                100
            );

        }
    );


    closeButton.addEventListener(
        "click",
        () => {

            closeModal(modal);

        }
    );


    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {
                closeModal(modal);
            }

        }
    );


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            validateAccessCode();

        }
    );


    if (toggle) {

        toggle.addEventListener(
            "click",
            () => {

                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    toggle.textContent =
                        "🙈";

                    toggle.setAttribute(
                        "aria-label",
                        "Hide access code"
                    );

                } else {

                    input.type =
                        "password";

                    toggle.textContent =
                        "👁";

                    toggle.setAttribute(
                        "aria-label",
                        "Show access code"
                    );

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal(modal);

            }

        }
    );

}


function validateAccessCode() {

    const input =
        $("#accessCode");

    const message =
        $("#accessMessage");

    if (!input || !message) {
        return;
    }

    const enteredCode =
        input.value.trim();


    if (
        enteredCode === ACCESS_CODE
    ) {

        unlockVideos();

        message.textContent =
            "Access granted. Videos are now unlocked.";

        message.className =
            "access-message success";


        /*
         * Keep unlocked state only for this browser tab.
         */
        sessionStorage.setItem(
            "projectVideosUnlocked",
            "true"
        );


        setTimeout(
            () => {

                const modal =
                    $("#accessModal");

                if (modal) {
                    closeModal(modal);
                }

                input.value = "";

            },
            900
        );

    } else {

        message.textContent =
            "Incorrect access code. Please try again.";

        message.className =
            "access-message error";

        input.select();

    }

}


/* =========================================================
   MODAL HELPERS
   ========================================================= */

function openModal(modal) {

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal(modal) {

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   SESSION ACCESS
   ========================================================= */

function restoreVideoAccess() {

    const unlocked =
        sessionStorage.getItem(
            "projectVideosUnlocked"
        );

    if (
        unlocked === "true"
    ) {

        unlockVideos();

    }

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

                container.appendChild(item);

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
   ERROR HANDLING
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
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


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


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        restoreVideoAccess();

        setTimeout(
            handleVideoErrors,
            300
        );

    }
);
