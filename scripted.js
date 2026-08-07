(function(){
    "use strict";
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        document.querySelectorAll('.traffic-layer svg').forEach(function (svg) {
            if (svg.pauseAnimations) svg.pauseAnimations();
        });
    }

    /* ---- staggered reveal on scroll ---- */
    var revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    setTimeout(function () { entry.target.classList.add('is-visible'); }, i * 140);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- animated stat counters ---- */
    var statEls = document.querySelectorAll('[data-count]');
    var countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        statEls.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-count'), 10) || 0;
            var suffix = el.getAttribute('data-suffix') || '';
            var start = null, duration = 1400;
            function step(ts) {
                if (!start) start = ts;
                var progress = Math.min((ts - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }
    var statsBar = document.querySelector('.stats-bar');
    if (statsBar && 'IntersectionObserver' in window) {
        var statsIo = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { startCounters(); statsIo.disconnect(); }
            });
        }, { threshold: 0.4 });
        statsIo.observe(statsBar);
    } else {
        startCounters();
    }

    /* ---- cursor spotlight over the contour layer ---- */
    var hero = document.getElementById('hero');
    if (hero && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
        var raf = null, px = 50, py = 40;
        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            px = ((e.clientX - rect.left) / rect.width) * 100;
            py = ((e.clientY - rect.top) / rect.height) * 100;
            if (!raf) raf = requestAnimationFrame(update);
        });
        function update() {
            raf = null;
            hero.style.setProperty('--mx', px + '%');
            hero.style.setProperty('--my', py + '%');
        }
    }
})();