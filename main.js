//hamburger menu animaton
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
}
//making the text be aniamted
//writting one letter by one letter
var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

//image gallery slider
(function() {
    function scrollH(e) {
        // Prevent scroll default
        e.preventDefault();
        e = window.event || e;
        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.querySelector('.sliderf').scrollLeft -= (delta * 40);
    }
    if (document.querySelector('.sliderf').addEventListener) {
        document.querySelector('.sliderf').addEventListener('mousewheel', scrollH, false);
        document.querySelector('.sliderf').addEventListener('DOMMouseScroll', scrollH, false);
    }
})();

//image gallery slider
(function() {
    function scrollH(e) {
        // Prevent scroll default
        e.preventDefault();
        e = window.event || e;
        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.querySelector('.sliderg').scrollLeft -= (delta * 40);
    }
    if (document.querySelector('.sliderg').addEventListener) {
        document.querySelector('.sliderg').addEventListener('mousewheel', scrollH, false);
        document.querySelector('.sliderg').addEventListener('DOMMouseScroll', scrollH, false);
    }
})();

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
        loop: true
    })
    .add({
        targets: '.ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });

//the special projects slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlidesfade");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

const container = document.querySelector('.details-group-example');

// Close all other details when one is shown
container.addEventListener('sl-show', event => {
    [...container.querySelectorAll('sl-details')].map(details => (details.open = event.target === details));
});

let delSections = document.querySelectorAll(".delayed-section");

delSections.forEach(section => {

    let imageAnim = gsap.to(section.querySelector("img"), {
        y: "-100vh",
        ease: "none",
        paused: true
    });

    let progressTo = gsap.quickTo(imageAnim, "progress", {
        ease: "power3",
        duration: parseFloat(section.dataset.scrub) || 0.1
    });

    gsap.to(section.querySelector(".innerContainer"), {
        y: "100vh",
        ease: "none",
        scrollTrigger: {
            scrub: true,
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            onUpdate: self => progressTo(self.progress)
        }
    });

});