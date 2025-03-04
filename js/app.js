
// Initializations
let hamburger = document.querySelector('.hamburger');
let mob_area = document.querySelector('.mobile-view-nav');
let web_nav_list = document.querySelector('.web-view-nav ul');
let mobile_nav_list = mob_area.querySelectorAll('.area nav ul li');
let close_icon = document.querySelector('.close-menu');
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded",()=>{
  'use strict';

  // Scrollspy
  const navbarLinks = document.querySelectorAll('.web-view-nav ul li'); 
  const sections = document.querySelectorAll('main, section'); // Include main
  
  window.addEventListener('scroll', function () {
      const currentPos = window.scrollY;
      sections.forEach(function (section) {
          const sectionTop = section.offsetTop - 50;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
  
          if (currentPos >= sectionTop && currentPos < sectionTop + sectionHeight) {
              navbarLinks.forEach(function (navbarLink) {
                  navbarLink.classList.remove('active-link');
              });
  
              // Select links in both web and mobile menus
              document.querySelectorAll('.web-view-nav ul li a[href="#' + sectionId + '"]')
                .forEach(link => link.parentElement.classList.add('active-link'));
          }
      });
  });
  

  const scrollPage = () => {
    var tl = gsap.timeline();
    // Initial Screen Setup
    tl.from('.logo',  { opacity: 0, y: '-100%', duration: 1},0)
    tl.from(hamburger, { opacity: 0, y: '-100%', duration: 1},0)
    tl.from(web_nav_list.children, { opacity : 0, x: 0 , duration:1, delay:0.3, stagger:0.3, clearProps: "transform" },0);
    tl.to('.bgImg h2', { opacity : 1, marginTop : 0, duration : 1 },0)
    tl.to('.bgImg h3', { opacity : 1, marginTop : 0, duration : 1 },0)

    // For each TITLE
    document.querySelectorAll('.title').forEach((title)=>{
      gsap.fromTo(title, {
        opacity :  0,
        x: 200,
      },{
        opacity : 1,
        x:0,
        duration : 1,
        delay:.5,
        scrollTrigger : {
          trigger : title,
          start : 'top 90%',
          end : 'bottom center',
          scrub : false
        }
      })
    })

    // About sections
    const splitTypes = document.querySelectorAll('.content p')
    // Animate each content
    splitTypes.forEach((cont)=>{
      gsap.fromTo(cont,{
        opacity : 0,
        x: 200
        }, {
        opacity: 1,
        x:0,
        duration : 1,
        delay : 0.5,
        scrollTrigger: {
          trigger: cont,
          // scrub: 1,
          start: "top 90%",
          end: "bottom bottom",
          scrub:true
        }
      });
    })

    // Team Animation
    gsap.timeline({
      scrollTrigger: {
        trigger: '.cards',
        start: "top center", 
        end: "bottom 20%", 
        scrub : false
      },
      defaults: {
        duration: 0.9,
        ease: "power1.inOut"
      }
    })
    .from(".cards .card", { opacity: 0 }, 0)
    .to(".cards .card", { opacity: 1, stagger: 0.2 },0)  

    // Contact
    gsap.timeline({
      scrollTrigger: {
        trigger: '.form-elements',
        start: "top center", 
        end: "bottom center", 
        scrub: false    
      },
      defaults: {
        duration: 0.9,
        ease: "power1.inOut"
      }
    })
    .from(".form-elements .form-item", { opacity: 0 }, 0)
    .to(".form-elements .form-item", { opacity: 1, stagger: 0.2 })  
  }

  // initSmoothScrolling();
  scrollPage();
})

// If mob nav is visible in large screens then it should be removed
window.addEventListener("resize", (e) => {
    if(window.innerWidth > 768){
        e.preventDefault();
        mob_area.classList.remove('open')
    }
});

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

// Add event listener to each menu item
web_nav_list.querySelectorAll('li').forEach((menu)=>{
menu.addEventListener('click',(e)=>{
  // e.preventDefault();
  console
  web_nav_list.querySelectorAll('li').forEach((item) => item.classList.remove('active-link'));
  menu.classList.add('active-link')
})     
})

// Hamburger click event for closing
close_icon.addEventListener('click',(e) =>{
  e.preventDefault()
  mob_area.classList.remove('open')
})

// Year for footer
let date = new Date().getFullYear()
document.querySelector('.year').textContent = date