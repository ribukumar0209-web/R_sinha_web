// Hero Slider
 const slides=document.querySelectorAll(".slide");
if(slides.length){
    let cur=0;
    setInterval(()=>{
        slides[cur].classList.remove("active");
        cur=(cur+1)%slides.length;
        slides[cur].classList.add("active");
    },5000);
}
        
document.addEventListener('DOMContentLoaded', () => {
// 1. Unified Slider Logic
const sliders = document.querySelectorAll('[data-slider]');   
sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.adv-slides img');
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');
    let currentIdx = 0;
    const updateSlides = (newIdx) => {
        slides[currentIdx].classList.remove('active');
        currentIdx = (newIdx + slides.length) % slides.length;
        slides[currentIdx].classList.add('active');
    };
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlides(currentIdx + 1);
    });
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateSlides(currentIdx - 1);
    });
});

// 2. Advanced Scroll Reveal
const revealExpertise = () => {
    const section = document.querySelector('#expertise-portal');
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;
    if (sectionPos < screenPos) {
        section.classList.add('active');
    }
};
window.addEventListener('scroll', revealExpertise);
});

         // Teaching Card Toggle with View More/Less logic
         function toggleTeachingCard(card) {
             card.classList.toggle('expanded');
             const btn = card.querySelector('.view-more-toggle');
             if(card.classList.contains('expanded')) {
                 btn.textContent = 'View Less';
             } else {
                 btn.textContent = 'View More';
             }
         }


         // Scroll Reveal
         const obs = new IntersectionObserver((es) => { es.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); }); }, { threshold: 0.1 });
         document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL LOGIC
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('know-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.know-reveal-section').forEach(section => {
        observer.observe(section);
    });

    // 2. SLIDER LOGIC
    document.querySelectorAll('.know-feature-card').forEach(card => {
        const images = card.querySelectorAll('.know-slider-wrapper img');
        const nextBtn = card.querySelector('.know-next');
        const prevBtn = card.querySelector('.know-prev');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('know-img-active'));
            images[index].classList.add('know-img-active');
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    });
});

//current phd scholars slider
let scholarIndex = 0;

function moveScholar(direction) {
    const track = document.getElementById('scholarTrack');
    const cards = track.children;
    const totalScholars = cards.length;
    
    // Determine how many cards are visible based on screen width
    let visibleCards = 1;
    if (window.innerWidth >= 1024) visibleCards = 4;
    else if (window.innerWidth >= 640) visibleCards = 2;

    const maxIndex = totalScholars - visibleCards;

    // Update index
    scholarIndex += direction;

    // Boundary constraints
    if (scholarIndex < 0) scholarIndex = 0;
    if (scholarIndex > maxIndex) scholarIndex = maxIndex;

    // Calculate percentage to slide
    // In a 4-card view, each card is 25% width
    const slideAmount = scholarIndex * (100 / visibleCards);
    track.style.transform = `translateX(-${slideAmount}%)`;

    // Update button states (hide if at start or end)
    document.getElementById('scholarPrev').disabled = (scholarIndex === 0);
    document.getElementById('scholarNext').disabled = (scholarIndex >= maxIndex);
}

// Initialize arrow states on load
window.addEventListener('load', () => moveScholar(0));
// Reset position on resize to prevent layout breaking
window.addEventListener('resize', () => {
    scholarIndex = 0;
    moveScholar(0);
});
// past phd scholars slider
const sliderStates = {
    'assocTrack': 0,
    'scholarTrack': 0 // if you use the same function for other sliders
};

function moveScholarSlider(direction, trackId) {
    const track = document.getElementById(trackId);
    const cards = track.children;
    const total = cards.length;
    
    // Determine responsive visibility
    let visible = 1;
    if (window.innerWidth >= 1024) visible = 4;
    else if (window.innerWidth >= 640) visible = 2;

    const maxIndex = total - visible;

    // Update the specific state
    sliderStates[trackId] += direction;

    // Bound checks
    if (sliderStates[trackId] < 0) sliderStates[trackId] = 0;
    if (sliderStates[trackId] > maxIndex) sliderStates[trackId] = maxIndex;

    // Slide the track
    const movePercentage = sliderStates[trackId] * (100 / visible);
    track.style.transform = `translateX(-${movePercentage}%)`;

    // Handle button visibility for this specific slider
    const parent = track.closest('.group');
    const prevBtn = parent.querySelector('button[id*="Prev"]');
    const nextBtn = parent.querySelector('button[id*="Next"]');
    
    prevBtn.disabled = (sliderStates[trackId] === 0);
    nextBtn.disabled = (sliderStates[trackId] >= maxIndex);
}

// Optional: Reset on resize to prevent alignment issues
window.addEventListener('resize', () => {
    Object.keys(sliderStates).forEach(id => {
        sliderStates[id] = 0;
        moveScholarSlider(0, id);
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    moveScholarSlider(0, 'assocTrack');
});
//m.tech scholars slider
// Initialize state for each slider ID
/**
 * Global Slider Controller
 * Tracks the current index of every slider on the page using its ID
 */
const labSliderPositions = {
    'scholarTrack': 0, // PhD Section
    'assocTrack': 0,   // Research Associates Section
    'mtechTrack': 0,   // M.Tech Section
    'labSlider': 0     // Main Lab Infrastructure Slider
};

function moveScholarSlider(direction, trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;

    const cards = track.children;
    const totalCards = cards.length;
    
    // Determine visibility based on Tailwind's responsive breakpoints
    let visibleCount = 1;
    if (window.innerWidth >= 1024) {
        visibleCount = 4; // 4 cards for lg screens
    } else if (window.innerWidth >= 640) {
        visibleCount = 2; // 2 cards for sm/md screens
    }

    // Main Lab slider specifically usually shows only 1 card, 
    // we handle that by checking the trackId
    if (trackId === 'labSlider') visibleCount = 1;

    const maxIndex = totalCards - visibleCount;

    // Update index in the global tracker
    labSliderPositions[trackId] += direction;

    // Keep index within valid range
    if (labSliderPositions[trackId] < 0) {
        labSliderPositions[trackId] = 0;
    }
    if (labSliderPositions[trackId] > maxIndex) {
        labSliderPositions[trackId] = maxIndex;
    }

    // Calculate displacement percentage
    const movePercentage = labSliderPositions[trackId] * (100 / visibleCount);
    track.style.transform = `translateX(-${movePercentage}%)`;

    // Handle Button Visibility/States
    const container = track.closest('.group');
    const prevBtn = container.querySelector('button[id*="Prev"]');
    const nextBtn = container.querySelector('button[id*="Next"]');
    
    if (prevBtn) prevBtn.disabled = (labSliderPositions[trackId] === 0);
    if (nextBtn) nextBtn.disabled = (labSliderPositions[trackId] >= maxIndex);
}

// Ensure all sliders are correctly aligned on initial load
window.addEventListener('load', () => {
    Object.keys(labSliderPositions).forEach(id => moveScholarSlider(0, id));
});

// Reset sliders on screen resize to prevent alignment glitches
window.addEventListener('resize', () => {
    Object.keys(labSliderPositions).forEach(id => {
        labSliderPositions[id] = 0; 
        moveScholarSlider(0, id);
    });
});



// student text compression
document.addEventListener("DOMContentLoaded", function () {
    const wordLimit = 30;
    const bios = document.querySelectorAll('.js-bio-text');

    bios.forEach((p, index) => {
        const fullText = p.innerText.trim();
        const words = fullText.split(/\s+/);

        if (words.length > wordLimit) {
            const shortenedText = words.slice(0, wordLimit).join(" ") + "...";
            
            // 1. Assign unique IDs to the spans so the button can find them easily
            const shortId = `short-${index}`;
            const fullId = `full-${index}`;
            
            p.innerHTML = `
                <span id="${shortId}">${shortenedText}</span>
                <span id="${fullId}" style="display: none;">${fullText}</span>
            `;

            // 2. Create the button
            const btn = document.createElement("button");
            btn.type = "button";
            btn.innerText = "View More";
            
            // 3. Styling - Added z-index and pointer-events to force play
            btn.className = "text-[11px] text-[#c5a059] font-bold mt-2 hover:underline block mx-auto relative z-[9999] pointer-events-auto cursor-pointer";

            // 4. THE FIX: Inline click handler (Harder for carousels to block)
            btn.onclick = function(e) {
                // Stop carousel from sliding when clicking button
                if(e) e.stopPropagation(); 
                
                const shortSpan = document.getElementById(shortId);
                const fullSpan = document.getElementById(fullId);

                if (fullSpan.style.display === "none") {
                    fullSpan.style.display = "inline";
                    shortSpan.style.display = "none";
                    btn.innerText = "View Less";
                } else {
                    fullSpan.style.display = "none";
                    shortSpan.style.display = "inline";
                    btn.innerText = "View More";
                }
            };

            p.after(btn);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       NAVBAR ELEMENTS
    ========================================================= */

    const navbar = document.querySelector(".top-navbar");
    const menu = document.querySelector(".nav-menu");
    const menuToggle = document.querySelector(".menu-toggle");

    const dropdowns = document.querySelectorAll(".nav-dropdown");
    const dropdownToggles =
        document.querySelectorAll(".publication-toggle");

    const dropdownItems =
        document.querySelectorAll(".dropdown-item");

    const allNavLinks =
        document.querySelectorAll(".nav-link");


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    if (menuToggle && menu) {

        menuToggle.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                menu.classList.toggle("show");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =========================================================
       CLOSE ALL DROPDOWNS
    ========================================================= */

    function closeAllDropdowns(except = null) {

        dropdowns.forEach(function (dropdown) {

            if (dropdown === except) {
                return;
            }

            dropdown.classList.remove("open");

            const button =
                dropdown.querySelector(".publication-toggle");

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =========================================================
       CLOSE MOBILE MENU
    ========================================================= */

    function closeMobileMenu() {

        if (menu) {
            menu.classList.remove("show");
        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /* =========================================================
       DROPDOWN TOGGLE
       Works for ALL THREE dropdowns
    ========================================================= */

    dropdownToggles.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const dropdown =
                button.closest(".nav-dropdown");

            if (!dropdown) {
                return;
            }

            const isOpen =
                dropdown.classList.contains("open");


            /* ---------------------------------------------
               Close every other dropdown
            --------------------------------------------- */

            closeAllDropdowns(dropdown);


            /* ---------------------------------------------
               Toggle current dropdown
            --------------------------------------------- */

            if (isOpen) {

                dropdown.classList.remove("open");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                dropdown.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =========================================================
       DROPDOWN ITEM CLICK
    ========================================================= */

    dropdownItems.forEach(function (item) {

        item.addEventListener("click", function () {

            /* Close dropdowns */

            closeAllDropdowns();

            /* Close mobile navigation */

            closeMobileMenu();

        });

    });


    /* =========================================================
       NORMAL NAVIGATION LINKS
    ========================================================= */

    document
        .querySelectorAll(
            ".nav-menu > li > a.nav-link"
        )
        .forEach(function (link) {

            link.addEventListener("click", function () {

                /* Close all dropdowns */

                closeAllDropdowns();

                /* Close mobile menu */

                closeMobileMenu();

            });

        });


    /* =========================================================
       CLICK OUTSIDE NAVBAR
    ========================================================= */

    document.addEventListener("click", function (event) {

        if (!navbar) {
            return;
        }

        if (!navbar.contains(event.target)) {

            closeAllDropdowns();

            closeMobileMenu();

        }

    });


    /* =========================================================
       ESCAPE KEY
       Close dropdown/menu
    ========================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeAllDropdowns();

            closeMobileMenu();

        }

    });


    /* =========================================================
       RESIZE HANDLER
    ========================================================= */

    window.addEventListener("resize", function () {

        /*
         * When switching to desktop,
         * reset the mobile menu.
         */

        if (window.innerWidth > 992) {

            closeMobileMenu();

        }

    });


    /* =========================================================
       ACTIVE PAGE DETECTION
    ========================================================= */

    function getCurrentPage() {

        let page =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();

        if (
            page === "" ||
            page === "index.html"
        ) {

            page = "rs_web.html";

        }

        return page;

    }


    /* =========================================================
       PAGE GROUPS
    ========================================================= */

    const careerPages = [

        "resume.html",
        "services.html"

    ];


    const researchPages = [

        "research_expertise.html",
        "research.html",
        "peer_review_books.html",
        "citations.html",
        "conferences.html",
        "invited_lectures.html"

    ];


    const teachingPages = [

        "teaching.html",
        "outreach.html",
        "thesis.html"

    ];


    /* =========================================================
       REMOVE ACTIVE CLASSES
    ========================================================= */

    function clearActiveLinks() {

        document
            .querySelectorAll(".nav-link")
            .forEach(function (link) {

                link.classList.remove("active");

            });

    }


    /* =========================================================
       FIND DROPDOWN TOGGLE
    ========================================================= */

    function getDropdownToggle(dropdown) {

        if (!dropdown) {
            return null;
        }

        return dropdown.querySelector(
            ".publication-toggle"
        );

    }


    /* =========================================================
       FIND DROPDOWN BY PAGE
    ========================================================= */

    function activateDropdownByPages(page) {

        let targetPages = null;

        if (careerPages.includes(page)) {

            targetPages = careerPages;

        }

        else if (researchPages.includes(page)) {

            targetPages = researchPages;

        }

        else if (teachingPages.includes(page)) {

            targetPages = teachingPages;

        }


        if (!targetPages) {
            return;
        }


        dropdowns.forEach(function (dropdown) {

            const items =
                dropdown.querySelectorAll(
                    ".dropdown-item"
                );

            items.forEach(function (item) {

                const href =
                    item.getAttribute("href");

                if (!href) {
                    return;
                }

                const itemPage =
                    href
                        .split("#")[0]
                        .split("/")
                        .pop()
                        .toLowerCase();


                if (itemPage === page) {

                    /*
                     * Highlight the actual
                     * dropdown page.
                     */

                    item.classList.add("active");

                    /*
                     * Highlight the parent
                     * dropdown button.
                     */

                    const parentToggle =
                        getDropdownToggle(dropdown);

                    if (parentToggle) {

                        parentToggle.classList.add(
                            "active"
                        );

                    }

                }

            });

        });

    }


    /* =========================================================
       NORMAL TOP LEVEL PAGE ACTIVE STATE
    ========================================================= */

    function activateTopLevelPage(page) {

        document
            .querySelectorAll(
                ".nav-menu > li > a.nav-link"
            )
            .forEach(function (link) {

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }


                const linkPage =
                    href
                        .split("#")[0]
                        .split("/")
                        .pop()
                        .toLowerCase();

                const linkHash =
                    href.includes("#")
                        ? "#" +
                          href
                              .split("#")[1]
                              .toLowerCase()
                        : "";


                /*
                 * Only activate normal
                 * page links here.
                 */

                if (
                    linkPage === page &&
                    !linkHash
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    }


    /* =========================================================
       HOME PAGE ACTIVE STATE
    ========================================================= */

    function activateHomeSection(target) {

        clearActiveLinks();

        const homeLink =
            document.querySelector(
                `.nav-link[href="Rs_web.html${target}"]`
            );

        if (homeLink) {

            homeLink.classList.add(
                "active"
            );

        }

    }


    /* =========================================================
       INITIAL ACTIVE PAGE
    ========================================================= */

    function setInitialActivePage() {

        clearActiveLinks();

        /*
         * Remove active state from dropdown
         * items first.
         */

        document
            .querySelectorAll(".dropdown-item")
            .forEach(function (item) {

                item.classList.remove(
                    "active"
                );

            });


        const currentPage =
            getCurrentPage();

        const currentHash =
            window.location.hash.toLowerCase();


        /* ---------------------------------------------
           HOME PAGE
        --------------------------------------------- */

        if (
            currentPage === "rs_web.html"
        ) {

            if (
                currentHash === "#contact"
            ) {

                activateHomeSection(
                    "#contact"
                );

            }

            else {

                activateHomeSection(
                    "#hero"
                );

            }

            return;

        }


        /* ---------------------------------------------
           NORMAL TOP LEVEL PAGE
        --------------------------------------------- */

        activateTopLevelPage(
            currentPage
        );


        /* ---------------------------------------------
           DROPDOWN PAGE
        --------------------------------------------- */

        activateDropdownByPages(
            currentPage
        );

    }


    setInitialActivePage();


    /* =========================================================
       NORMAL NAVIGATION CLICK
    ========================================================= */

    allNavLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                 * Do not interfere with
                 * dropdown buttons.
                 */

                if (
                    link.classList.contains(
                        "publication-toggle"
                    )
                ) {

                    return;

                }

            }
        );

    });


    /* =========================================================
       HOME PAGE CLICK EVENTS
    ========================================================= */

    const heroSection =
        document.querySelector("#hero");

    const contactSection =
        document.querySelector("#contact");


    const homeHeroLink =
        document.querySelector(
            '.nav-link[href="Rs_web.html#hero"]'
        );


    const homeContactLink =
        document.querySelector(
            '.nav-link[href="Rs_web.html#contact"]'
        );


    if (homeHeroLink) {

        homeHeroLink.addEventListener(
            "click",
            function () {

                activateHomeSection(
                    "#hero"
                );

            }
        );

    }


    if (homeContactLink) {

        homeContactLink.addEventListener(
            "click",
            function () {

                activateHomeSection(
                    "#contact"
                );

            }
        );

    }


    /* =========================================================
       HOME PAGE SCROLL OBSERVER
    ========================================================= */

    if (
        heroSection &&
        contactSection
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            if (
                                entry.target.id ===
                                "hero"
                            ) {

                                activateHomeSection(
                                    "#hero"
                                );

                            }


                            if (
                                entry.target.id ===
                                "contact"
                            ) {

                                activateHomeSection(
                                    "#contact"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.45
                }
            );


        observer.observe(
            heroSection
        );

        observer.observe(
            contactSection
        );

    }


    /* =========================================================
       NAVBAR SCROLL EFFECT
    ========================================================= */

    window.addEventListener(
        "scroll",
        function () {

            if (!navbar) {
                return;
            }


            if (
                window.scrollY > 40
            ) {

                navbar.classList.add(
                    "navbar-scrolled"
                );

            }

            else {

                navbar.classList.remove(
                    "navbar-scrolled"
                );

            }

        }
    );


    /* =========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================= */

    dropdownToggles.forEach(function (button) {

        button.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Enter or Space
                 */

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                }


                /*
                 * Escape
                 */

                if (
                    event.key === "Escape"
                ) {

                    closeAllDropdowns();

                }

            }
        );

    });


});



