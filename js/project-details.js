/* =========================================================
   PROJECT DETAILS JAVASCRIPT
   Modern Dark Developer Portfolio
   Frontend-only version
========================================================= */


/* =========================================================
   PROJECT DATA
========================================================= */

const projects = {

    edutrack: {

        title: "EduTrack Tanzania",

        shortDescription:
            "A smart digital platform designed to simplify academic assessment and management for secondary-level education.",

        description:
            "EduTrack Tanzania is a digital education management project focused on helping schools manage academic assessment, student records, teachers, subjects and academic activities more efficiently. The system is designed to reduce manual work, improve accuracy and provide a more organized digital workflow for secondary-level education.",

        type:
            "Education Management System",

        status:
            "Development",

        role:
            "Software Developer",

        year:
            "2026",

        technologies: [
            "PHP",
            "MySQL",
            "HTML5",
            "CSS3",
            "JavaScript",
            "MySQLi"
        ],

        features: [
            {
                title: "Academic Management",
                description:
                    "Organizes academic information and assessment workflows in one digital environment."
            },

            {
                title: "Role-Based Workflow",
                description:
                    "Provides dedicated workflows for administrators, academic officers and teachers."
            },

            {
                title: "Student Assessment",
                description:
                    "Supports structured academic assessment and calculation workflows."
            },

            {
                title: "Teacher Management",
                description:
                    "Helps manage teachers and their academic responsibilities."
            },

            {
                title: "Student Records",
                description:
                    "Provides an organized digital structure for student academic information."
            },

            {
                title: "Centralized System",
                description:
                    "Brings important academic management operations together in one platform."
            }
        ],

        images: [
            {
                title: "System Dashboard",
                file: "assets/images/projects/edutrack/image-1.jpg"
            },

            {
                title: "Academic Management",
                file: "assets/images/projects/edutrack/image-2.jpg"
            },

            {
                title: "Student Records",
                file: "assets/images/projects/edutrack/image-3.jpg"
            },

            {
                title: "Teacher Management",
                file: "assets/images/projects/edutrack/image-4.jpg"
            }
        ],

        videos: [
            {
                title: "System Overview",
                description:
                    "A demonstration of the overall system workflow.",
                file:
                    "assets/videos/projects/edutrack/video-1.mp4"
            },

            {
                title: "Academic Workflow",
                description:
                    "Demonstration of the academic management workflow.",
                file:
                    "assets/videos/projects/edutrack/video-2.mp4"
            }
        ]

    },


    "tanzania-sda-services": {

        title: "Tanzania SDA Services",

        shortDescription:
            "A digital church services platform designed to organize registration, leadership and member-related workflows.",

        description:
            "Tanzania SDA Services is a church-focused digital platform designed to improve how church-related services and registration processes are organized. The project focuses on structured workflows for churches, leaders and members while keeping the experience simple and accessible.",

        type:
            "Church Services Platform",

        status:
            "Development",

        role:
            "Software Developer",

        year:
            "2026",

        technologies: [
            "PHP",
            "MySQL",
            "HTML5",
            "CSS3",
            "JavaScript",
            "MySQLi"
        ],

        features: [
            {
                title: "Church Management",
                description:
                    "Provides a structured environment for organizing church information."
            },

            {
                title: "Member Registration",
                description:
                    "Supports structured registration based on existing member records."
            },

            {
                title: "Leadership Workflow",
                description:
                    "Provides dedicated registration workflows for church leaders."
            },

            {
                title: "Church Selection",
                description:
                    "Allows users to identify their Mtaa and church before continuing registration."
            },

            {
                title: "Registration Verification",
                description:
                    "Uses existing member information to verify registration details."
            },

            {
                title: "Digital Services",
                description:
                    "Creates a foundation for delivering multiple church services digitally."
            }
        ],

        images: [
            {
                title: "Registration Interface",
                file:
                    "assets/images/projects/tanzania-sda-services/image-1.jpg"
            },

            {
                title: "Church Selection",
                file:
                    "assets/images/projects/tanzania-sda-services/image-2.jpg"
            },

            {
                title: "Member Registration",
                file:
                    "assets/images/projects/tanzania-sda-services/image-3.jpg"
            },

            {
                title: "Services Dashboard",
                file:
                    "assets/images/projects/tanzania-sda-services/image-4.jpg"
            }
        ],

        videos: [
            {
                title: "Registration Process",
                description:
                    "Demonstration of the registration workflow.",
                file:
                    "assets/videos/projects/tanzania-sda-services/INTRO SDA SERVICES WEBSITE_hopekins.mp4"
            }
        ]

    }

};


/* =========================================================
   CONSTANTS
========================================================= */

const MAX_IMAGES = 4;
const MAX_VIDEOS = 6;
const MAX_COMMENTS = 5;

/*
 * Frontend-only demonstration access code.
 *
 * IMPORTANT:
 * This is NOT secure authentication because the
 * JavaScript is visible to visitors.
 *
 * Later this can be replaced with PHP verification.
 */
const VIDEO_ACCESS_CODE = "DEMO2026";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const projectTitle =
    document.getElementById("projectTitle");

const projectShortDescription =
    document.getElementById("projectShortDescription");

const projectDescription =
    document.getElementById("projectDescription");

const projectType =
    document.getElementById("projectType");

const projectStatus =
    document.getElementById("projectStatus");

const projectRole =
    document.getElementById("projectRole");

const projectYear =
    document.getElementById("projectYear");

const projectTechnologies =
    document.getElementById("projectTechnologies");

const projectFeatures =
    document.getElementById("projectFeatures");

const projectGallery =
    document.getElementById("projectGallery");

const projectVideos =
    document.getElementById("projectVideos");

const videoAccessPanel =
    document.getElementById("videoAccessPanel");

const openCodeModal =
    document.getElementById("openCodeModal");

const codeModal =
    document.getElementById("codeModal");

const closeCodeModal =
    document.getElementById("closeCodeModal");

const accessCodeForm =
    document.getElementById("accessCodeForm");

const accessCode =
    document.getElementById("accessCode");

const accessError =
    document.getElementById("accessError");

const imageLightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const downloadImage =
    document.getElementById("downloadImage");


/* =========================================================
   CURRENT PROJECT
========================================================= */

let currentProject = null;

let currentImages = [];

let currentLightboxIndex = 0;


/* =========================================================
   GET PROJECT FROM URL
========================================================= */

function getProjectKey() {

    const params =
        new URLSearchParams(window.location.search);

    return params.get("project");

}


/* =========================================================
   LOAD PROJECT
========================================================= */

function loadProject() {

    const projectKey =
        getProjectKey();

    if (!projectKey) {

        showProjectNotFound();

        return;

    }

    const project =
        projects[projectKey];

    if (!project) {

        showProjectNotFound();

        return;

    }

    currentProject = project;

    document.title =
        `${project.title} | Software Developer`;

    renderProject(project);

}


/* =========================================================
   RENDER PROJECT
========================================================= */

function renderProject(project) {

    /* -----------------------------------------
       Basic information
    ----------------------------------------- */

    if (projectTitle) {
        projectTitle.textContent =
            project.title;
    }

    if (projectShortDescription) {
        projectShortDescription.textContent =
            project.shortDescription;
    }

    if (projectDescription) {
        projectDescription.textContent =
            project.description;
    }

    if (projectType) {
        projectType.textContent =
            project.type;
    }

    if (projectStatus) {
        projectStatus.textContent =
            project.status;
    }

    if (projectRole) {
        projectRole.textContent =
            project.role;
    }

    if (projectYear) {
        projectYear.textContent =
            project.year;
    }


    /* -----------------------------------------
       Technologies
    ----------------------------------------- */

    renderTechnologies(
        project.technologies
    );


    /* -----------------------------------------
       Features
    ----------------------------------------- */

    renderFeatures(
        project.features
    );


    /* -----------------------------------------
       Images
    ----------------------------------------- */

    renderGallery(
        project.images
    );


    /* -----------------------------------------
       Videos
    ----------------------------------------- */

    renderVideos(
        project.videos
    );

}


/* =========================================================
   TECHNOLOGIES
========================================================= */

function renderTechnologies(technologies) {

    if (!projectTechnologies) {
        return;
    }

    projectTechnologies.innerHTML = "";

    technologies.forEach(
        technology => {

            const element =
                document.createElement("span");

            element.className =
                "project-tech";

            element.textContent =
                technology;

            projectTechnologies.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   FEATURES
========================================================= */

function renderFeatures(features) {

    if (!projectFeatures) {
        return;
    }

    projectFeatures.innerHTML = "";

    features.forEach(
        (feature, index) => {

            const card =
                document.createElement("article");

            card.className =
                "feature-card";

            card.innerHTML = `

                <span class="feature-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                    ${escapeHTML(feature.title)}
                </h3>

                <p>
                    ${escapeHTML(feature.description)}
                </p>

            `;

            projectFeatures.appendChild(card);

        }
    );

}


/* =========================================================
   IMAGE GALLERY
========================================================= */

function renderGallery(images) {

    if (!projectGallery) {
        return;
    }

    projectGallery.innerHTML = "";

    /*
     * Enforce maximum of 4 images.
     */

    currentImages =
        Array.isArray(images)
            ? images.slice(0, MAX_IMAGES)
            : [];


    if (currentImages.length === 0) {

        projectGallery.innerHTML = `
            <div class="gallery-empty">
                No project images available yet.
            </div>
        `;

        return;

    }


    currentImages.forEach(
        (image, index) => {

            const item =
                document.createElement("article");

            item.className =
                "gallery-item";

            item.innerHTML = `

                <img
                    src="${escapeAttribute(image.file)}"
                    alt="${escapeAttribute(image.title)}"
                    class="gallery-image"
                    data-index="${index}"
                    loading="lazy"
                >

                <div class="gallery-overlay">

                    <span class="gallery-title">
                        ${escapeHTML(image.title)}
                    </span>

                    <div class="gallery-actions">

                        <button
                            type="button"
                            class="media-action gallery-like"
                            data-media-id="image-${index}"
                            aria-label="Like image"
                        >
                            <span>♡</span>
                            <span class="like-count">0</span>
                        </button>

                        <a
                            href="${escapeAttribute(image.file)}"
                            class="media-action"
                            download
                            aria-label="Download image"
                        >
                            ↓
                        </a>

                    </div>

                </div>

            `;

            projectGallery.appendChild(item);

        }
    );


    attachGalleryEvents();

}


/* =========================================================
   GALLERY EVENTS
========================================================= */

function attachGalleryEvents() {

    const images =
        document.querySelectorAll(
            ".gallery-image"
        );

    images.forEach(
        image => {

            image.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            image.dataset.index
                        );

                    openLightbox(index);

                }
            );

        }
    );


    const likeButtons =
        document.querySelectorAll(
            ".gallery-like"
        );

    likeButtons.forEach(
        button => {

            setupLikeButton(button);

        }
    );

}


/* =========================================================
   VIDEO GALLERY
========================================================= */

function renderVideos(videos) {

    if (!projectVideos) {
        return;
    }

    projectVideos.innerHTML = "";

    /*
     * Enforce maximum of 6 videos.
     */

    const limitedVideos =
        Array.isArray(videos)
            ? videos.slice(0, MAX_VIDEOS)
            : [];


    if (limitedVideos.length === 0) {

        projectVideos.innerHTML = `
            <div class="videos-empty">
                No demonstration videos available yet.
            </div>
        `;

        return;

    }


    limitedVideos.forEach(
        (video, index) => {

            const card =
                createVideoCard(
                    video,
                    index
                );

            projectVideos.appendChild(card);

        }
    );

}


/* =========================================================
   CREATE VIDEO CARD
========================================================= */

function createVideoCard(video, index) {

    const card =
        document.createElement("article");

    card.className =
        "video-card";

    const mediaId =
        `video-${index}`;

    card.innerHTML = `

        <div class="video-player-wrapper">

            <video
                class="video-player"
                controls
                preload="metadata"
            >

                <source
                    src="${escapeAttribute(video.file)}"
                    type="video/mp4"
                >

                Your browser does not support
                HTML5 video.

            </video>

        </div>


        <div class="video-details">

            <h3>
                ${escapeHTML(video.title)}
            </h3>

            <p class="video-description">
                ${escapeHTML(video.description)}
            </p>


            <div class="video-actions">

                <button
                    type="button"
                    class="media-action video-like"
                    data-media-id="${mediaId}"
                >
                    <span class="like-icon">♡</span>

                    <span>
                        Like
                    </span>

                    <span class="like-count">
                        0
                    </span>
                </button>


                <a
                    href="${escapeAttribute(video.file)}"
                    class="media-action"
                    download
                >
                    ↓ Download
                </a>

            </div>


            <div class="video-comments">

                <div class="comments-heading">

                    <strong>
                        Comments
                    </strong>

                    <span
                        class="comments-count"
                        data-comment-count="${mediaId}"
                    >
                        0 / ${MAX_COMMENTS}
                    </span>

                </div>


                <div
                    class="comments-list"
                    data-comments="${mediaId}"
                >
                </div>


                <form
                    class="comment-form"
                    data-comment-form="${mediaId}"
                >

                    <input
                        type="text"
                        name="commenter"
                        placeholder="Your name"
                        maxlength="40"
                        required
                    >

                    <textarea
                        name="comment"
                        placeholder="Write a comment..."
                        maxlength="250"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Post Comment
                    </button>

                </form>

            </div>

        </div>

    `;


    setupLikeButton(
        card.querySelector(".video-like")
    );


    setupComments(
        card,
        mediaId
    );


    return card;

}


/* =========================================================
   VIDEO ACCESS
========================================================= */

function unlockVideos() {

    if (!videoAccessPanel || !projectVideos) {
        return;
    }

    videoAccessPanel.classList.add(
        "hidden"
    );

    projectVideos.classList.remove(
        "hidden"
    );

}


/* =========================================================
   ACCESS CODE MODAL
========================================================= */

function openAccessModal() {

    if (!codeModal) {
        return;
    }

    codeModal.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(
        () => {

            if (accessCode) {
                accessCode.focus();
            }

        },
        100
    );

}


function closeAccessModal() {

    if (!codeModal) {
        return;
    }

    codeModal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

    if (accessError) {
        accessError.textContent = "";
    }

    if (accessCode) {
        accessCode.value = "";
    }

}


/* =========================================================
   VERIFY ACCESS CODE
========================================================= */

function verifyAccessCode(event) {

    event.preventDefault();

    if (!accessCode) {
        return;
    }

    const enteredCode =
        accessCode.value.trim();


    if (!enteredCode) {

        showAccessError(
            "Please enter the access code."
        );

        return;

    }


    /*
     * Case-insensitive comparison.
     */

    if (
        enteredCode.toUpperCase() ===
        VIDEO_ACCESS_CODE.toUpperCase()
    ) {

        localStorage.setItem(
            getVideoAccessStorageKey(),
            "unlocked"
        );

        closeAccessModal();

        unlockVideos();

        return;

    }


    showAccessError(
        "The access code is incorrect."
    );

    accessCode.select();

}


/* =========================================================
   ACCESS ERROR
========================================================= */

function showAccessError(message) {

    if (!accessError) {
        return;
    }

    accessError.textContent =
        message;

}


/* =========================================================
   REMEMBER VIDEO ACCESS
========================================================= */

function getVideoAccessStorageKey() {

    const projectKey =
        getProjectKey() || "unknown";

    return `portfolio_video_access_${projectKey}`;

}


function checkExistingVideoAccess() {

    const unlocked =
        localStorage.getItem(
            getVideoAccessStorageKey()
        );

    if (unlocked === "unlocked") {

        unlockVideos();

    }

}


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

function openLightbox(index) {

    if (
        !imageLightbox ||
        !currentImages.length
    ) {
        return;
    }

    currentLightboxIndex =
        normalizeImageIndex(index);

    updateLightbox();

    imageLightbox.classList.remove(
        "hidden"
    );

    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    if (!imageLightbox) {
        return;
    }

    imageLightbox.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}


function updateLightbox() {

    if (
        !currentImages.length ||
        !lightboxImage
    ) {
        return;
    }

    const image =
        currentImages[
            currentLightboxIndex
        ];


    lightboxImage.src =
        image.file;

    lightboxImage.alt =
        image.title;


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentLightboxIndex + 1} / ${currentImages.length}`;

    }


    if (downloadImage) {

        downloadImage.href =
            image.file;

        downloadImage.setAttribute(
            "download",
            getDownloadFilename(
                image.file
            )
        );

    }

}


function normalizeImageIndex(index) {

    if (!currentImages.length) {
        return 0;
    }

    if (index < 0) {

        return currentImages.length - 1;

    }

    if (
        index >=
        currentImages.length
    ) {

        return 0;

    }

    return index;

}


function showPreviousImage() {

    currentLightboxIndex =
        normalizeImageIndex(
            currentLightboxIndex - 1
        );

    updateLightbox();

}


function showNextImage() {

    currentLightboxIndex =
        normalizeImageIndex(
            currentLightboxIndex + 1
        );

    updateLightbox();

}


/* =========================================================
   LIKES
========================================================= */

function setupLikeButton(button) {

    if (!button) {
        return;
    }

    const mediaId =
        button.dataset.mediaId;

    if (!mediaId) {
        return;
    }


    updateLikeButton(
        button,
        mediaId
    );


    button.addEventListener(
        "click",
        () => {

            toggleLike(
                button,
                mediaId
            );

        }
    );

}


function getLikeStorageKey(mediaId) {

    const projectKey =
        getProjectKey() || "unknown";

    return `portfolio_like_${projectKey}_${mediaId}`;

}


function getLikeCountStorageKey(mediaId) {

    const projectKey =
        getProjectKey() || "unknown";

    return `portfolio_like_count_${projectKey}_${mediaId}`;

}


function toggleLike(button, mediaId) {

    const liked =
        localStorage.getItem(
            getLikeStorageKey(mediaId)
        ) === "true";


    let count =
        Number(
            localStorage.getItem(
                getLikeCountStorageKey(
                    mediaId
                )
            ) || 0
        );


    if (liked) {

        localStorage.setItem(
            getLikeStorageKey(mediaId),
            "false"
        );

        count =
            Math.max(
                0,
                count - 1
            );

    } else {

        localStorage.setItem(
            getLikeStorageKey(mediaId),
            "true"
        );

        count++;

    }


    localStorage.setItem(
        getLikeCountStorageKey(mediaId),
        String(count)
    );


    updateLikeButton(
        button,
        mediaId
    );

}


function updateLikeButton(
    button,
    mediaId
) {

    if (!button) {
        return;
    }

    const liked =
        localStorage.getItem(
            getLikeStorageKey(mediaId)
        ) === "true";


    const count =
        Number(
            localStorage.getItem(
                getLikeCountStorageKey(
                    mediaId
                )
            ) || 0
        );


    const countElement =
        button.querySelector(
            ".like-count"
        );


    const icon =
        button.querySelector(
            ".like-icon"
        ) ||
        button.querySelector(
            "span"
        );


    if (countElement) {

        countElement.textContent =
            count;

    }


    if (icon) {

        if (
            button.classList.contains(
                "gallery-like"
            )
        ) {

            icon.textContent =
                liked
                    ? "♥"
                    : "♡";

        } else {

            icon.textContent =
                liked
                    ? "♥"
                    : "♡";

        }

    }


    button.classList.toggle(
        "liked",
        liked
    );

}


/* =========================================================
   COMMENTS
========================================================= */

function getCommentsStorageKey(
    mediaId
) {

    const projectKey =
        getProjectKey() || "unknown";

    return `portfolio_comments_${projectKey}_${mediaId}`;

}


function getComments(mediaId) {

    try {

        const saved =
            localStorage.getItem(
                getCommentsStorageKey(
                    mediaId
                )
            );

        if (!saved) {
            return [];
        }

        const comments =
            JSON.parse(saved);

        return Array.isArray(comments)
            ? comments
            : [];

    } catch (error) {

        console.warn(
            "Unable to load comments.",
            error
        );

        return [];

    }

}


function saveComments(
    mediaId,
    comments
) {

    localStorage.setItem(
        getCommentsStorageKey(
            mediaId
        ),
        JSON.stringify(comments)
    );

}


function setupComments(
    card,
    mediaId
) {

    const form =
        card.querySelector(
            `[data-comment-form="${mediaId}"]`
        );

    if (!form) {
        return;
    }


    renderComments(
        card,
        mediaId
    );


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            addComment(
                card,
                mediaId,
                form
            );

        }
    );

}


function renderComments(
    card,
    mediaId
) {

    const list =
        card.querySelector(
            `[data-comments="${mediaId}"]`
        );

    const counter =
        card.querySelector(
            `[data-comment-count="${mediaId}"]`
        );

    const form =
        card.querySelector(
            `[data-comment-form="${mediaId}"]`
        );


    if (!list) {
        return;
    }


    const comments =
        getComments(mediaId)
            .slice(0, MAX_COMMENTS);


    list.innerHTML = "";


    comments.forEach(
        comment => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "comment-item";

            item.innerHTML = `

                <span class="comment-author">
                    ${escapeHTML(comment.name)}
                </span>

                <p class="comment-text">
                    ${escapeHTML(comment.text)}
                </p>

            `;

            list.appendChild(item);

        }
    );


    if (counter) {

        counter.textContent =
            `${comments.length} / ${MAX_COMMENTS}`;

    }


    /*
     * Disable the form after five comments.
     */

    if (comments.length >= MAX_COMMENTS) {

        if (form) {

            form.innerHTML = `
                <div class="comment-limit-message">
                    Comment limit reached for this video.
                </div>
            `;

        }

    }

}


function addComment(
    card,
    mediaId,
    form
) {

    const comments =
        getComments(mediaId);


    if (
        comments.length >=
        MAX_COMMENTS
    ) {

        renderComments(
            card,
            mediaId
        );

        return;

    }


    const nameInput =
        form.querySelector(
            '[name="commenter"]'
        );

    const commentInput =
        form.querySelector(
            '[name="comment"]'
        );


    if (
        !nameInput ||
        !commentInput
    ) {
        return;
    }


    const name =
        nameInput.value.trim();

    const text =
        commentInput.value.trim();


    if (!name || !text) {
        return;
    }


    comments.push({

        name:
            name.substring(0, 40),

        text:
            text.substring(0, 250),

        createdAt:
            Date.now()

    });


    saveComments(
        mediaId,
        comments
    );


    form.reset();


    renderComments(
        card,
        mediaId
    );

}


/* =========================================================
   PROJECT NOT FOUND
========================================================= */

function showProjectNotFound() {

    if (projectTitle) {

        projectTitle.textContent =
            "Project Not Found";

    }

    if (projectShortDescription) {

        projectShortDescription.textContent =
            "The project you are looking for could not be found.";

    }

    if (projectDescription) {

        projectDescription.textContent =
            "Please return to the projects section and select a valid project.";

    }

    if (projectTechnologies) {
        projectTechnologies.innerHTML = "";
    }

    if (projectFeatures) {
        projectFeatures.innerHTML = "";
    }

    if (projectGallery) {

        projectGallery.innerHTML = `
            <div class="gallery-empty">
                Project information is unavailable.
            </div>
        `;

    }

    if (projectVideos) {
        projectVideos.innerHTML = "";
    }

}


/* =========================================================
   SECURITY / TEXT SANITIZATION
========================================================= */

/*
 * Escape text before inserting it into innerHTML.
 */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

    return escapeHTML(value);

}


/* =========================================================
   FILE NAME HELPER
========================================================= */

function getDownloadFilename(
    filePath
) {

    const cleanPath =
        filePath.split("?")[0];

    const parts =
        cleanPath.split("/");

    return parts[
        parts.length - 1
    ] || "project-media";

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * Escape closes modal/lightbox.
         */

        if (event.key === "Escape") {

            if (
                codeModal &&
                !codeModal.classList.contains(
                    "hidden"
                )
            ) {

                closeAccessModal();

            }


            if (
                imageLightbox &&
                !imageLightbox.classList.contains(
                    "hidden"
                )
            ) {

                closeLightbox();

            }

        }


        /*
         * Image navigation.
         */

        if (
            imageLightbox &&
            !imageLightbox.classList.contains(
                "hidden"
            )
        ) {

            if (event.key === "ArrowLeft") {

                showPreviousImage();

            }

            if (event.key === "ArrowRight") {

                showNextImage();

            }

        }

    }
);


/* =========================================================
   MODAL EVENTS
========================================================= */

if (openCodeModal) {

    openCodeModal.addEventListener(
        "click",
        openAccessModal
    );

}


if (closeCodeModal) {

    closeCodeModal.addEventListener(
        "click",
        closeAccessModal
    );

}


if (accessCodeForm) {

    accessCodeForm.addEventListener(
        "submit",
        verifyAccessCode
    );

}


if (codeModal) {

    codeModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                codeModal
            ) {

                closeAccessModal();

            }

        }
    );

}


/* =========================================================
   LIGHTBOX EVENTS
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        showPreviousImage
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        showNextImage
    );

}


if (imageLightbox) {

    imageLightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                imageLightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProject();

        checkExistingVideoAccess();

    }
);
