/* ================================================================
   HOPEKINS LEVY — PERSONAL PORTFOLIO
   Main JavaScript
   Front-end only
   ================================================================ */


/* ================================================================
   01. DOM ELEMENTS
   ================================================================ */

const pageLoader = document.getElementById("pageLoader");
const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const skillRows = document.querySelectorAll(".skill-row");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const currentYear = document.getElementById("currentYear");


/* ================================================================
   02. PAGE LOADER
   ================================================================ */

function hidePageLoader() {

    if (!pageLoader) {
        return;
    }

    pageLoader.classList.add("loaded");

}


/*
 * Wait until the page has completely loaded.
 */

window.addEventListener("load", () => {

    setTimeout(() => {

        hidePageLoader();

    }, 500);

});


/* ================================================================
   03. MOBILE NAVIGATION
   ================================================================ */

function openMobileMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.classList.add("active");

    mainNav.classList.add("open");

    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

}


function closeMobileMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }

    menuToggle.classList.remove("active");

    mainNav.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


function toggleMobileMenu() {

    if (!mainNav) {
        return;
    }

    const isOpen =
        mainNav.classList.contains("open");

    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/*
 * Close the mobile menu after clicking
 * a navigation link.
 */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/*
 * Close the mobile menu when clicking
 * outside the navigation area.
 */

document.addEventListener("click", (event) => {

    if (!mainNav || !menuToggle) {
        return;
    }

    const clickedInsideNavigation =
        mainNav.contains(event.target);

    const clickedMenuButton =
        menuToggle.contains(event.target);

    if (
        !clickedInsideNavigation &&
        !clickedMenuButton &&
        mainNav.classList.contains("open")
    ) {

        closeMobileMenu();

    }

});


/*
 * Escape key closes mobile navigation.
 */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMobileMenu();

    }

});


/* ================================================================
   04. HEADER SCROLL EFFECT
   ================================================================ */

function updateHeader() {

    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 30) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/*
 * Run once on page load.
 */

updateHeader();


/* ================================================================
   05. ACTIVE NAVIGATION
   ================================================================ */


/*
 * Find all sections that correspond to
 * navigation links.
 */

const sections = document.querySelectorAll(
    "main section[id]"
);


/*
 * Intersection Observer watches which
 * section is currently visible.
 */

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const sectionId =
                    entry.target.getAttribute("id");


                navLinks.forEach((link) => {

                    link.classList.remove("active");


                    const target =
                        link.getAttribute("href");


                    if (
                        target === `#${sectionId}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            root: null,

            threshold: 0.2,

            rootMargin:
                "-20% 0px -60% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* ================================================================
   06. SMOOTH ANCHOR SCROLLING
   ================================================================ */


/*
 * The CSS already provides smooth scrolling.
 * This JavaScript adds a little extra control
 * and makes the fixed header behave correctly.
 */

const anchorLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


anchorLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const targetElement =
                document.querySelector(
                    targetId
                );


            if (!targetElement) {

                return;

            }


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                targetElement.getBoundingClientRect()
                    .top
                +
                window.scrollY
                -
                headerHeight
                -
                15;


            const prefersReducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            window.scrollTo({

                top: Math.max(
                    targetPosition,
                    0
                ),

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });


            /*
             * Update URL without
             * causing an unwanted jump.
             */

            if (
                history.pushState
            ) {

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        }
    );

});


/* ================================================================
   07. SCROLL REVEAL ANIMATIONS
   ================================================================ */


/*
 * Reveal elements as they enter
 * the viewport.
 */

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {

                    return;

                }


                entry.target.classList.add(
                    "visible"
                );


                /*
                 * Once an element has appeared,
                 * we no longer need to observe it.
                 */

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================================================================
   08. SKILL BAR ANIMATION
   ================================================================ */


/*
 * Skill bars are already controlled
 * by CSS custom properties such as:
 *
 * --skill: 90%
 *
 * JavaScript only adds the "visible"
 * class at the correct moment.
 */

const skillObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {

                    return;

                }


                entry.target.classList.add(
                    "visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.35
        }
    );


skillRows.forEach((row) => {

    skillObserver.observe(row);

});


/* ================================================================
   09. BACK TO TOP
   ================================================================ */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    if (window.scrollY > 700) {

        backToTop.classList.add(
            "visible"
        );

    } else {

        backToTop.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


updateBackToTop();


/*
 * Back-to-top click.
 */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            const prefersReducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


/* ================================================================
   10. AUTOMATIC COPYRIGHT YEAR
   ================================================================ */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================================================================
   11. CONTACT FORM
   ================================================================ */


/*
 * IMPORTANT:
 *
 * This is a FRONT-END ONLY website.
 *
 * The form does not send an email to a server yet.
 *
 * For now, JavaScript validates the fields
 * and gives the visitor feedback.
 *
 * Later we can connect this form to:
 *
 * - Formspree
 * - EmailJS
 * - Web3Forms
 * - Netlify Forms
 * - A custom PHP backend
 *
 * without redesigning the form.
 */


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (formStatus) {

                formStatus.textContent = "";

            }


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim();


            /*
             * Basic validation.
             */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    "Please complete all fields."
                );

                return;

            }


            /*
             * Browser email validation.
             */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showFormMessage(
                    "Please enter a valid email address."
                );

                return;

            }


            /*
             * At this stage we don't have
             * a backend/email service.
             */

            showFormMessage(
                `Thanks ${name}. Your message is ready to be connected to an email service.`
            );


            /*
             * Clear the form after
             * successful front-end validation.
             */

            contactForm.reset();

        }
    );

}


/* ================================================================
   12. CONTACT FORM MESSAGE
   ================================================================ */

function showFormMessage(message) {

    if (!formStatus) {
        return;
    }


    formStatus.textContent = message;


    /*
     * Remove the message automatically
     * after several seconds.
     */

    window.clearTimeout(
        showFormMessage.timeout
    );


    showFormMessage.timeout =
        window.setTimeout(
            () => {

                formStatus.textContent = "";

            },
            6000
        );

}


/* ================================================================
   13. INPUT INTERACTION
   ================================================================ */


/*
 * Add a small visual state to form groups
 * when the user focuses on an input.
 */

const formInputs =
    document.querySelectorAll(
        ".contact-form input, .contact-form textarea"
    );


formInputs.forEach((input) => {

    input.addEventListener(
        "focus",
        () => {

            input.closest(
                ".form-group"
            )?.classList.add("focused");

        }
    );


    input.addEventListener(
        "blur",
        () => {

            input.closest(
                ".form-group"
            )?.classList.remove("focused");

        }
    );

});


/* ================================================================
   14. RESPONSIVE MENU CLEANUP
   ================================================================ */


/*
 * If the browser is resized from mobile
 * to desktop, make sure the mobile menu
 * state doesn't remain active.
 */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850
        ) {

            closeMobileMenu();

        }

    }
);


/* ================================================================
   15. MOUSE PARALLAX — HERO VISUAL
   ================================================================ */


/*
 * A subtle mouse movement effect gives
 * the hero visual a premium feel.
 *
 * It is disabled on touch devices and
 * when reduced motion is requested.
 */

const heroVisual =
    document.querySelector(".hero-visual");


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


const isTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;


if (
    heroVisual &&
    !prefersReducedMotion &&
    !isTouchDevice
) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (
                    event.clientX
                    -
                    rect.left
                )
                /
                rect.width
                -
                0.5;


            const y =
                (
                    event.clientY
                    -
                    rect.top
                )
                /
                rect.height
                -
                0.5;


            const orbit =
                heroVisual.querySelector(
                    ".developer-orbit"
                );


            if (!orbit) {
                return;
            }


            orbit.style.transform =
                `
                translate(
                    ${x * 8}px,
                    ${y * 8}px
                )
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const orbit =
                heroVisual.querySelector(
                    ".developer-orbit"
                );


            if (!orbit) {
                return;
            }


            orbit.style.transform =
                "translate(0, 0)";

        }
    );

}


/* ================================================================
   16. PROJECT CARD TILT
   ================================================================ */


/*
 * Very subtle 3D interaction for project
 * cards on desktop.
 */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    !prefersReducedMotion &&
    !isTouchDevice
) {

    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX
                    -
                    rect.left;


                const y =
                    event.clientY
                    -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        (x - centerX)
                        /
                        centerX
                    )
                    *
                    1.2;


                const rotateX =
                    (
                        (centerY - y)
                        /
                        centerY
                    )
                    *
                    1.2;


                card.style.transform =
                    `
                    translateY(-5px)
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* ================================================================
   17. VISIBILITY FALLBACK
   ================================================================ */


/*
 * If IntersectionObserver is not available
 * in an older browser, simply reveal
 * everything immediately.
 */

if (
    !("IntersectionObserver" in window)
) {

    revealElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });


    skillRows.forEach((row) => {

        row.classList.add(
            "visible"
        );

    });

}


/* ================================================================
   18. CONSOLE BRAND MESSAGE
   ================================================================ */


/*
 * A small developer-style message.
 */

console.log(
    "%c Hopekins Levy ",
    "background:#7c5cff;color:white;padding:6px 10px;border-radius:5px;font-weight:bold;"
);


console.log(
    "%c Software Developer Portfolio ",
    "color:#9d87ff;font-weight:bold;"
);


console.log(
    "Building practical digital solutions."
);


/* ============================================================
   HOPEKINS LEVY
   PERSONAL PORTFOLIO
   MAIN JAVASCRIPT
   ============================================================ */

"use strict";


/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initMobileNavigation();
    initProjectFilters();
    initProjectModal();
    initSmoothScrolling();
    initScrollEffects();

});


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

function initMobileNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (!menuToggle || !navMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );

        }

    });


    /* Close menu when navigation link is selected */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon = menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* ============================================================
   PROJECT FILTERS
   ============================================================ */

function initProjectFilters() {

    const filterButtons =
        document.querySelectorAll(".project-filter");

    const projectCards =
        document.querySelectorAll(".project-card");


    if (
        !filterButtons.length ||
        !projectCards.length
    ) {
        return;
    }


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.filter;


            /* Update active button */

            filterButtons.forEach(filter => {

                filter.classList.remove("active");

                filter.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            button.classList.add("active");

            button.setAttribute(
                "aria-selected",
                "true"
            );


            /* Filter projects */

            projectCards.forEach(card => {

                const categories =
                    card.dataset.category || "";


                if (
                    selectedFilter === "all" ||
                    categories
                        .split(" ")
                        .includes(selectedFilter)
                ) {

                    card.classList.remove("hidden");

                    card.style.animation =
                        "none";

                    /*
                     * Force browser reflow so the
                     * animation can restart.
                     */

                    void card.offsetWidth;

                    card.style.animation =
                        "projectCardIn 0.5s ease both";

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });

}


/* ============================================================
   PROJECT DATA
   ============================================================ */

const projectData = {

    edutrack: {

        title: "EduTrack Tanzania",

        description:
            "A digital academic management platform designed to help secondary-level institutions manage assessment, academic records, teachers, students, subjects, combinations and performance workflows more efficiently.",

        technologies: [
            "PHP",
            "MySQL",
            "MySQLi",
            "JavaScript",
            "HTML5",
            "CSS3"
        ],

        url: "#"

    },


    sda: {

        title: "Tanzania SDA Services",

        description:
            "A church services management platform designed to digitize registration, membership workflows, leadership registration and church-level administrative processes.",

        technologies: [
            "PHP",
            "MySQL",
            "MySQLi",
            "JavaScript",
            "HTML5",
            "CSS3"
        ],

        url: "#"

    }

};


/* ============================================================
   PROJECT MODAL
   ============================================================ */

function initProjectModal() {

    const modal =
        document.getElementById("projectModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTech =
        document.getElementById("modalTech");

    const modalProjectLink =
        document.getElementById("modalProjectLink");


    if (
        !modal ||
        !modalTitle ||
        !modalDescription ||
        !modalTech
    ) {
        return;
    }


    /*
     * Project buttons
     *
     * We identify projects from the
     * project card heading.
     */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        const viewButton =
            card.querySelector(
                ".project-link.primary"
            );


        if (!viewButton) {
            return;
        }


        const titleElement =
            card.querySelector("h3");


        if (!titleElement) {
            return;
        }


        const title =
            titleElement.textContent.trim();


        let projectKey = null;


        if (title === "EduTrack Tanzania") {

            projectKey = "edutrack";

        }

        else if (
            title === "Tanzania SDA Services"
        ) {

            projectKey = "sda";

        }


        /*
         * Ignore "Start a Project"
         */

        if (!projectKey) {
            return;
        }


        viewButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openProjectModal(
                    projectKey,
                    modal,
                    modalTitle,
                    modalDescription,
                    modalTech,
                    modalProjectLink
                );

            }
        );

    });


    /* Close button */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            () => {

                closeProjectModal(modal);

            }
        );

    }


    /* Close buttons inside modal */

    const modalCloseElements =
        modal.querySelectorAll(
            "[data-modal-close]"
        );


    modalCloseElements.forEach(element => {

        element.addEventListener(
            "click",
            () => {

                closeProjectModal(modal);

            }
        );

    });


    /* Escape key */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeProjectModal(modal);

            }

        }
    );

}


/* ============================================================
   OPEN PROJECT MODAL
   ============================================================ */

function openProjectModal(
    projectKey,
    modal,
    modalTitle,
    modalDescription,
    modalTech,
    modalProjectLink
) {

    const project =
        projectData[projectKey];


    if (!project) {
        return;
    }


    /* Project title */

    modalTitle.textContent =
        project.title;


    /* Project description */

    modalDescription.textContent =
        project.description;


    /* Technologies */

    modalTech.innerHTML = "";


    project.technologies.forEach(technology => {

        const tag =
            document.createElement("span");

        tag.textContent =
            technology;

        modalTech.appendChild(tag);

    });


    /* Project URL */

    if (modalProjectLink) {

        modalProjectLink.href =
            project.url;

    }


    /* Open modal */

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    /* Move focus to close button */

    const closeButton =
        document.getElementById("modalClose");


    if (closeButton) {

        setTimeout(() => {

            closeButton.focus();

        }, 100);

    }

}


/* ============================================================
   CLOSE PROJECT MODAL
   ============================================================ */

function closeProjectModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* ============================================================
   SMOOTH SCROLLING
   ============================================================ */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* ============================================================
   SCROLL EFFECTS
   ============================================================ */

function initScrollEffects() {

    const header =
        document.querySelector(".site-header");


    if (!header) {
        return;
    }


    let lastScroll = 0;


    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;


            /*
             * Add scrolled state.
             */

            if (currentScroll > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }


            lastScroll = currentScroll;

        },
        {
            passive: true
        }
    );

}


/* ============================================================
   INTERSECTION OBSERVER
   ============================================================ */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    /*
     * If browser does not support
     * IntersectionObserver, simply
     * display the elements.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ============================================================
   CURRENT YEAR
   ============================================================ */

function updateCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(element => {

        element.textContent =
            currentYear;

    });

}


/* ============================================================
   INITIALIZE OPTIONAL FEATURES
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initRevealAnimations();
        updateCurrentYear();

    }
);


/* ============================================================
   PROJECT IMAGE READY HANDLER
   ============================================================ */

function setProjectImage(
    placeholder,
    imagePath,
    altText
) {

    if (!placeholder || !imagePath) {
        return;
    }


    const image =
        document.createElement("img");


    image.src = imagePath;

    image.alt =
        altText || "Project screenshot";

    image.loading = "lazy";


    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";
    image.style.position = "absolute";
    image.style.inset = "0";


    image.addEventListener(
        "load",
        () => {

            placeholder
                .classList
                .add("has-image");

        }
    );


    image.addEventListener(
        "error",
        () => {

            image.remove();

        }
    );


    placeholder.appendChild(image);

}


/* ============================================================
   FUTURE PROJECT HELPER
   ============================================================ */

function registerProject({
    key,
    title,
    description,
    technologies = [],
    url = "#"
}) {

    if (!key || !title) {
        return;
    }


    projectData[key] = {

        title,
        description,
        technologies,
        url

    };

}


/* ============================================================
   CONSOLE SIGNATURE
   ============================================================ */

console.log(
    "%c<HL />",
    "font-size: 24px; font-weight: 800;"
);

console.log(
    "%cHopekins Levy — Software Developer",
    "font-size: 13px;"
);

console.log(
    "%cBuilding practical digital solutions.",
    "font-size: 12px; opacity: 0.7;"
);






/* ================================================================
   END OF SCRIPT
   ================================================================ */