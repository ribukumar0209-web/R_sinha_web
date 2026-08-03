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

    /*=========================================
        NAVBAR ELEMENTS
    =========================================*/

    const navbar = document.querySelector(".top-navbar");
    const menu = document.querySelector(".nav-menu");
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll(".nav-link");

    /*=========================================
        MOBILE MENU
    =========================================*/

    if (toggle && menu) {

        toggle.addEventListener("click", function (e) {

            e.stopPropagation();

            menu.classList.toggle("show");
            toggle.classList.toggle("active");

        });

        // Close after clicking a menu item
        navLinks.forEach(link => {

            link.addEventListener("click", function () {

                menu.classList.remove("show");
                toggle.classList.remove("active");

            });

        });

        // Close when clicking outside
        document.addEventListener("click", function (e) {

            if (!navbar.contains(e.target)) {

                menu.classList.remove("show");
                toggle.classList.remove("active");

            }

        });

        // Prevent closing when clicking inside menu
        menu.addEventListener("click", function (e) {

            e.stopPropagation();

        });

        // Close menu when screen becomes large
        window.addEventListener("resize", function () {

            if (window.innerWidth > 992) {

                menu.classList.remove("show");
                toggle.classList.remove("active");

            }

        });

    }

    /*=========================================
        ACTIVE PAGE HIGHLIGHT
    =========================================*/

    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "" || currentPage === "/") {
        currentPage = "Rs_web.html";
    }

    currentPage = currentPage.toLowerCase();

    const currentHash = window.location.hash.toLowerCase();

    navLinks.forEach(link => {

        link.classList.remove("active");

        let href = link.getAttribute("href");

        if (!href) return;

        href = href.toLowerCase();

        const page = href.split("#")[0];
        const hash = href.includes("#")
            ? "#" + href.split("#")[1]
            : "";

        /*-----------------------
            HOME PAGE
        -----------------------*/

        if (
            currentPage === "rs_web.html" ||
            currentPage === "index.html" ||
            currentPage === ""
        ) {

            if (currentHash === "#contact") {

                if (hash === "#contact") {

                    link.classList.add("active");

                }

            }

            else {

                if (
                    page === "rs_web.html" ||
                    page === "index.html" ||
                    page === ""
                ) {

                    link.classList.add("active");

                }

            }

        }

        /*-----------------------
            OTHER PAGES
        -----------------------*/

        else {

            if (page === currentPage) {

                link.classList.add("active");

            }

        }

    });

    /*=========================================
        SMOOTH NAVBAR SHADOW ON SCROLL
    =========================================*/

    window.addEventListener("scroll", function () {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    });

});


/*=========================================
    ACTIVE NAVIGATION (HOME PAGE)
=========================================*/

const navLinks = document.querySelectorAll(".nav-link");

const heroSection = document.querySelector("#hero");
const contactSection = document.querySelector("#contact");

// Remove active class from every link
function clearActiveLinks() {
    navLinks.forEach(link => link.classList.remove("active"));
}

// Highlight link by href
function activateLink(target) {
    clearActiveLinks();

    const activeLink = document.querySelector(
        `.nav-link[href="Rs_web.html${target}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }
}

/*---------------------------------------
    CLICK EVENTS
---------------------------------------*/

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        const href = this.getAttribute("href");

        if (href === "Rs_web.html#hero") {

            activateLink("#hero");

        }

        else if (href === "Rs_web.html#contact") {

            activateLink("#contact");

        }

    });

});


/*---------------------------------------
    SCROLL EVENTS
---------------------------------------*/

if (heroSection && contactSection) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                if (entry.target.id === "hero") {

                    activateLink("#hero");

                }

                if (entry.target.id === "contact") {

                    activateLink("#contact");

                }

            }

        });

    }, {
        threshold: 0.45
    });

    observer.observe(heroSection);
    observer.observe(contactSection);
}


/*=========================================================
        PREMIUM HERO IMAGE SLIDER
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*----------------------------------------
            ELEMENTS
    ----------------------------------------*/

    const slides = document.querySelectorAll(".domain-slide");

    const domainItems = document.querySelectorAll(".domain-item");

    const title = document.querySelector(".domain-info h2");

    const desc = document.querySelector(".domain-info p");

    const currentCounter = document.querySelector("#currentSlide");

    const slider = document.querySelector(".domain-slider");

    const nextBtn = document.querySelector(".domain-next");

    const prevBtn = document.querySelector(".domain-prev");

    if(!slides.length) return;

    /*----------------------------------------
            DOMAIN DATA
    ----------------------------------------*/

    const domainData = [

        {

            title:"Satellite Remote Sensing",

            text:"High-resolution Earth Observation for river dynamics, floodplain evolution, geomorphology and environmental monitoring."

        },

        {

            title:"GIS & Spatial Analytics",

            text:"Advanced geospatial analysis, spatial modelling, digital elevation analysis and geovisualization."

        },

        {

            title:"River Geomorphology",

            text:"Understanding channel migration, sediment transport, river evolution and floodplain processes."

        },

        {

            title:"Drone Based Mapping",

            text:"Ultra-high resolution UAV imagery for terrain modelling, vegetation analysis and precision mapping."

        },

        {

            title:"Earth Observation",

            text:"Multi-temporal satellite monitoring using Sentinel, Landsat, Planet and SAR datasets."

        },

        {

            title:"Machine Learning",

            text:"AI-driven geospatial modelling, river forecasting, flood susceptibility and environmental analytics."

        }

    ];



    /*----------------------------------------
            VARIABLES
    ----------------------------------------*/

    let current = 0;

    let autoplay;

    const delay = 5000;



    /*----------------------------------------
            SHOW SLIDE
    ----------------------------------------*/

    function showSlide(index){

        slides.forEach(slide=>{

            slide.classList.remove("active");

        });

        domainItems.forEach(item=>{

            item.classList.remove("active");

        });

        slides[index].classList.add("active");

        domainItems[index].classList.add("active");



        title.style.opacity=0;

        desc.style.opacity=0;



        setTimeout(()=>{

            title.textContent=domainData[index].title;

            desc.textContent=domainData[index].text;

            title.style.opacity=1;

            desc.style.opacity=1;

        },250);



        currentCounter.textContent=String(index+1).padStart(2,"0");

    }



    /*----------------------------------------
            NEXT
    ----------------------------------------*/

    function nextSlide(){

        current++;

        if(current>=slides.length){

            current=0;

        }

        showSlide(current);

    }



    /*----------------------------------------
            PREVIOUS
    ----------------------------------------*/

    function prevSlide(){

        current--;

        if(current<0){

            current=slides.length-1;

        }

        showSlide(current);

    }



    /*----------------------------------------
            AUTOPLAY
    ----------------------------------------*/

    function startSlider(){

        autoplay=setInterval(nextSlide,delay);

    }



    function stopSlider(){

        clearInterval(autoplay);

    }



    startSlider();



    /*----------------------------------------
            BUTTONS
    ----------------------------------------*/

    if(nextBtn){

        nextBtn.addEventListener("click",()=>{

            stopSlider();

            nextSlide();

            startSlider();

        });

    }



    if(prevBtn){

        prevBtn.addEventListener("click",()=>{

            stopSlider();

            prevSlide();

            startSlider();

        });

    }



    /*----------------------------------------
            HOVER PAUSE
    ----------------------------------------*/

    slider.addEventListener("mouseenter",stopSlider);

    slider.addEventListener("mouseleave",startSlider);



    /*----------------------------------------
        CLICK DOMAIN PILLS
    ----------------------------------------*/

    domainItems.forEach((item,index)=>{

        item.addEventListener("click",()=>{

            stopSlider();

            current=index;

            showSlide(current);

            startSlider();

        });

    });



    /*----------------------------------------
        INITIALIZE
    ----------------------------------------*/

    showSlide(current);

});


/*=========================================================
        PART 4B
        PREMIUM HERO ANIMATIONS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
                COUNTER ANIMATION
    =====================================================*/

    const counters = document.querySelectorAll(".hero-stat h3");

    let counterStarted = false;

    function animateCounters(){

        if(counterStarted) return;

        counterStarted = true;

        counters.forEach(counter=>{

            const target = parseInt(counter.dataset.count);

            let value = 0;

            const increment = Math.max(1, Math.ceil(target/90));

            const timer = setInterval(()=>{

                value += increment;

                if(value >= target){

                    value = target;

                    clearInterval(timer);

                }

                counter.textContent = value;

            },18);

        });

    }


    /*=====================================================
                OBSERVER
    =====================================================*/

    const hero = document.querySelector(".hero-profile");

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateCounters();

            }

        });

    },{

        threshold:0.45

    });

    if(hero) observer.observe(hero);



    /*=====================================================
            FLOATING PARTICLES
    =====================================================*/

    const particleContainer = document.querySelector(".hero-particles");

    if(particleContainer){

        for(let i=0;i<30;i++){

            const p = document.createElement("span");

            p.className="particle";

            p.style.left=Math.random()*100+"%";

            p.style.top=Math.random()*100+"%";

            p.style.width=(2+Math.random()*6)+"px";

            p.style.height=p.style.width;

            p.style.animationDuration=(8+Math.random()*10)+"s";

            p.style.animationDelay=(Math.random()*8)+"s";

            particleContainer.appendChild(p);

        }

    }



    /*=====================================================
                MOUSE PARALLAX
    =====================================================*/

    const professor=document.querySelector(".professor-frame");

    const dashboard=document.querySelector(".hero-dashboard");

    const satellite=document.querySelector(".floating-satellite");

    const drone=document.querySelector(".floating-drone");

    hero.addEventListener("mousemove",(e)=>{

        const rect=hero.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const moveX=(x-rect.width/2)/35;

        const moveY=(y-rect.height/2)/35;

        if(professor){

            professor.style.transform=
            `translate(${moveX}px,${moveY}px)`;

        }

        if(dashboard){

            dashboard.style.transform=
            `translate(${-moveX*.7}px,${-moveY*.7}px)`;

        }

        if(satellite){

            satellite.style.transform=
            `translate(${moveX*.45}px,${moveY*.45}px) rotate(${moveX}deg)`;

        }

        if(drone){

            drone.style.transform=
            `translate(${-moveX*.55}px,${-moveY*.55}px)`;

        }

    });



    hero.addEventListener("mouseleave",()=>{

        if(professor)
            professor.style.transform="translate(0,0)";

        if(dashboard)
            dashboard.style.transform="translate(0,0)";

        if(satellite)
            satellite.style.transform="translate(0,0)";

        if(drone)
            drone.style.transform="translate(0,0)";

    });



    /*=====================================================
            SCROLL REVEAL
    =====================================================*/

    const revealItems=document.querySelectorAll(

        ".hero-left>*," +
        ".hero-dashboard," +
        ".professor-frame"

    );

    const revealObserver=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("hero-visible");

            }

        });

    },{

        threshold:.15

    });

    revealItems.forEach(el=>{

        revealObserver.observe(el);

    });



    /*=====================================================
            FLOATING SATELLITE MOTION
    =====================================================*/

    let angle=0;

    function satelliteAnimation(){

        angle+=0.004;

        if(satellite){

            satellite.style.transform +=

            ` translateY(${Math.sin(angle)*5}px)`;

        }

        if(drone){

            drone.style.transform +=

            ` translateY(${Math.cos(angle)*4}px)`;

        }

        requestAnimationFrame(satelliteAnimation);

    }

    satelliteAnimation();



});

/*=========================================================
        PART 4C
        PREMIUM INTERACTIONS & PERFORMANCE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
            ELEMENTS
    =====================================================*/

    const slider = document.querySelector(".domain-slider");
    const slides = document.querySelectorAll(".domain-slide");

    if(!slider || slides.length===0) return;

    /*=====================================================
            TOUCH SWIPE
    =====================================================*/

    let startX = 0;
    let endX = 0;

    slider.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

    },{passive:true});



    slider.addEventListener("touchmove",(e)=>{

        endX = e.touches[0].clientX;

    },{passive:true});



    slider.addEventListener("touchend",()=>{

        const distance = startX-endX;

        if(Math.abs(distance)<60) return;

        if(distance>0){

            document.querySelector(".domain-next")?.click();

        }else{

            document.querySelector(".domain-prev")?.click();

        }

    });



    /*=====================================================
            KEYBOARD SUPPORT
    =====================================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){

            document.querySelector(".domain-next")?.click();

        }

        if(e.key==="ArrowLeft"){

            document.querySelector(".domain-prev")?.click();

        }

    });



    /*=====================================================
        MOUSE WHEEL NAVIGATION
    =====================================================*/

    let wheelTimer;

    slider.addEventListener("wheel",(e)=>{

        clearTimeout(wheelTimer);

        wheelTimer=setTimeout(()=>{

            if(e.deltaY>0){

                document.querySelector(".domain-next")?.click();

            }

            else{

                document.querySelector(".domain-prev")?.click();

            }

        },80);

    },{passive:true});



    /*=====================================================
            LAZY LOAD IMAGES
    =====================================================*/

    const images=document.querySelectorAll(".domain-slide img");

    const imageObserver=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const img=entry.target;

                if(img.dataset.src){

                    img.src=img.dataset.src;

                    img.removeAttribute("data-src");

                }

                imageObserver.unobserve(img);

            }

        });

    });

    images.forEach(img=>{

        imageObserver.observe(img);

    });



    /*=====================================================
        PAUSE WHEN TAB IS HIDDEN
    =====================================================*/

    document.addEventListener("visibilitychange",()=>{

        if(document.hidden){

            window.heroPaused=true;

        }

        else{

            window.heroPaused=false;

        }

    });



    /*=====================================================
            RAF OPTIMIZATION
    =====================================================*/

    let ticking=false;

    window.addEventListener("scroll",()=>{

        if(!ticking){

            window.requestAnimationFrame(()=>{

                ticking=false;

            });

            ticking=true;

        }

    });



    /*=====================================================
            RESIZE
    =====================================================*/

    let resizeTimer;

    window.addEventListener("resize",()=>{

        clearTimeout(resizeTimer);

        resizeTimer=setTimeout(()=>{

            document.documentElement.style.setProperty(

                "--vh",

                `${window.innerHeight*0.01}px`

            );

        },150);

    });



    /*=====================================================
        HERO PARALLAX DEPTH
    =====================================================*/

    const layers=document.querySelectorAll("[data-depth]");

    slider.addEventListener("mousemove",(e)=>{

        const rect=slider.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const cx=rect.width/2;

        const cy=rect.height/2;

        layers.forEach(layer=>{

            const depth=parseFloat(layer.dataset.depth);

            const moveX=(x-cx)*depth;

            const moveY=(y-cy)*depth;

            layer.style.transform=

            `translate(${moveX}px,${moveY}px)`;

        });

    });



    slider.addEventListener("mouseleave",()=>{

        layers.forEach(layer=>{

            layer.style.transform="translate(0,0)";

        });

    });



    /*=====================================================
        TECH LOGO MARQUEE
    =====================================================*/

    const techTrack=document.querySelector(".tech-track");

    if(techTrack){

        techTrack.innerHTML+=techTrack.innerHTML;

    }



    /*=====================================================
        KEYWORD MARQUEE
    =====================================================*/

    const keywordTrack=document.querySelector(".keyword-track");

    if(keywordTrack){

        keywordTrack.innerHTML+=keywordTrack.innerHTML;

    }



    /*=====================================================
        STAGGER ANIMATION
    =====================================================*/

    const heroItems=document.querySelectorAll(

        ".hero-left>*,"+

        ".hero-stat,"+

        ".domain-item,"+

        ".hero-social a"

    );



    heroItems.forEach((item,index)=>{

        item.style.opacity="0";

        item.style.transform="translateY(25px)";

        item.style.transition=

        `all .8s cubic-bezier(.2,.7,.2,1) ${index*0.08}s`;

    });



    window.addEventListener("load",()=>{

        heroItems.forEach(item=>{

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        });

    });



    /*=====================================================
        FPS FRIENDLY ANIMATION LOOP
    =====================================================*/

    let lastTime=0;

    function animationLoop(timestamp){

        if(window.heroPaused){

            requestAnimationFrame(animationLoop);

            return;

        }

        const delta=timestamp-lastTime;

        lastTime=timestamp;

        requestAnimationFrame(animationLoop);

    }

    requestAnimationFrame(animationLoop);



});