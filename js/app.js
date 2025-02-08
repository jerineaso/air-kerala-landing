// Initializations
let hamburger = document.querySelector('.hamburger');
let mob_area = document.querySelector('.mobile-view-nav');
let close_icon = document.querySelector('.close-menu');
let web_nav_list = document.querySelectorAll('.web-view-nav ul li');
let mobile_nav_list = mob_area.querySelectorAll('.area nav ul li');

// Lenis Smooth Scroll
// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


// Hamburger click event for opening
hamburger.addEventListener('click',(e) =>{
    e.preventDefault()
    mob_area.classList.add('open')
    // GSAP animation
    gsap.fromTo(mobile_nav_list, 
        { x: '100%', opacity: 0.3 }, 
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, clearProps: "transform" }
    );
})

// Click event for each mob menus
// Function to remove active class from all items
function removeActiveClass() {
  mobile_nav_list.forEach((item) => {
    if (item.classList.contains('active-link')) {
      item.classList.remove('active-link');
      item.querySelector('a').style.color = "var(--base-black)"; // Reset color
    }
  });
}

// Add event listener to each menu item
mobile_nav_list.forEach((menu) => {
  menu.addEventListener('click', (e) => {
    // Remove active class from all before adding to the clicked one
    removeActiveClass();
    // Close mobile menu
    mob_area.classList.remove('open');
    // Add active class to the clicked menu item
    menu.classList.add('active-link');
  });
});

web_nav_list.forEach((menu)=>{
  menu.addEventListener('click',(e)=>{
    // e.preventDefault();
    web_nav_list.forEach((item) => item.classList.remove('active-link'));
    menu.classList.add('active-link')
  })    
})

// Hamburger click event for closing
close_icon.addEventListener('click',(e) =>{
    e.preventDefault()
    mob_area.classList.remove('open')
})

// Initial content animations
window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    var tl = gsap.timeline()
    tl.from('.logo',  { opacity: 0, y: '-100%', duration: 1},0)
    tl.from(hamburger, { opacity: 0, y: '-100%', duration: 1},0)
    tl.fromTo(web_nav_list, { y: -100 , opacity : 0.3 }, { duration: .3, y: 0 , opacity : 1, delay : .3, clearProps: "transform" },0);
    tl.to('.bgImg h2', { opacity : 1, marginTop : 0, duration : 1 },0)
    tl.to('.bgImg button', { opacity : 1, marginTop : 0, duration : 1 },0)
})

// If mob nav is visible in large screens then it should be removed
window.addEventListener("resize", (e) => {
    if(window.innerWidth > 768){
        e.preventDefault();
        mob_area.classList.remove('open')
    }
});

// About sections
gsap.registerPlugin(ScrollTrigger);
const splitTypes = document.querySelectorAll('.content p')
// Animate each line on scroll
splitTypes.forEach((char, i) => {
  const text = new SplitType(char, { types : 'chars' })
  gsap.to(text.chars, {
    opacity: 1,
    color: "rgba(0, 0, 0, 1)",
    backgroundPositionX: 0,
    ease: "none",
    scrollTrigger: {
      trigger: char,
      scrub: 1,
      start: "top 90%",
      end: "bottom bottom"
    }
  });
});


// Team Animation
gsap.timeline({
  scrollTrigger: {
    trigger: '.cards',
    start: window.innerWidth < 968 ? "top 90%" : "top center", 
    end: "bottom 20", 
    scrub : true,  
  },
  defaults: {
    duration: 0.9,
    ease: "power1.inOut"
  }
})
.to(".cards .card", { opacity: 1, stagger: 0.2 })  
.from(".cards .card", { opacity: 0 }, 0); 


// Contact
gsap.timeline({
  scrollTrigger: {
    trigger: '.contact-form',
    start: window.innerWidth < 968 ? "top 80%" : "top center", 
    end: "bottom bottom", 
    scrub: true,      
  },
  defaults: {
    duration: 0.9,
    ease: "power1.inOut"
  }
})
.to(".contact-form .form-item", { opacity: 1, stagger: 0.3 })  
.from(".contact-form .form-item", { opacity: 0 }, 0); 

// Year for footer
let date = new Date().getFullYear()
document.querySelector('.year').textContent = date