document.addEventListener("DOMContentLoaded", () => {
    // Ensure GSAP and ScrollTrigger are registered
    // @ts-ignore
    gsap.registerPlugin(ScrollTrigger);
  
    // Initialize Lenis
    // @ts-ignore
    const lenis = new Lenis();
     // @ts-ignore
     lenis.on("scroll", ScrollTrigger.update);
      // @ts-ignore
      gsap.ticker.add((/** @type {number} */ time) => {
      lenis.raf(time * 1000);
    });
  
    // @ts-ignore
    gsap.ticker.lagSmoothing(0);
  
  
  const stickySection = document.querySelector(".steps");
  const stickyHeight = window.innerHeight * 7 ;
  const cards = document.querySelectorAll(".card");

  // @ts-ignore
  const countContainer = document.querySelector(".count-container");
  const totalCards = cards.length;

  // @ts-ignore
  ScrollTrigger.create({
    trigger: stickySection,
    start : "top top",
    end : `+=${stickyHeight}px`,
    pin : true,
    pinSpacing:true,
    onUpdate :(/** @type {{ progress: number | undefined; }} */ self)=>{
      // @ts-ignore
      positionCards(self.progress);

    },
  });

  const getRadius = ()=>{
    return window.innerWidth <900
    ? window.innerWidth * 7.5
    : window.innerWidth * 2.5;
  };

  const arcAngle = Math.PI * 0.4;
  const startAngle = Math.PI / 2 - arcAngle /2;

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  function positionCards(progress = 0 ) {
    // @ts-ignore
    const radius = getRadius();
    // @ts-ignore
    const totalTravel = 1 + totalCards / 7.5;
    // @ts-ignore
    const adjustedProgress = (progress * totalTravel -1)* 0.75;
   
    // @ts-ignore
    cards.forEach((card, i ) => {
      const normalizedProgress = (totalCards-1-i)/
      totalCards; 
      const cardProgress = normalizedProgress + 
      adjustedProgress; 
      // @ts-ignore
      const angle =  startAngle  + arcAngle  * cardProgress; 
      // @ts-ignore
      const x = Math.cos(angle)* radius; 
      // @ts-ignore
      const y= Math.sin(angle) * radius; 
      // @ts-ignore
      const rotation = (angle - Math.PI/2) * (180 / Math.PI); 
     
      // @ts-ignore
      gsap.set(card, {
      // @ts-ignore
      x: x,
      y : -y  + radius, 
      // @ts-ignore
      rotation: -rotation, 
      // @ts-ignore
      transformOrigin: "center center",
    // @ts-ignore
    });
  // @ts-ignore
  });
  
  // @ts-ignore
 
  }
  positionCards(0);

  let currentCardIndex = 0 ;

  const options ={
    root: null,
    threshold: 0.5,
    rootMargin: "0% 0%",
  };
   const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        lastScrollY = window.scrollY;
        let cardIndex = Array.from(cards).indexOf(entry.target);
        
          currentCardIndex = cardIndex;
          const targetY = 150 - currentCardIndex * 150;
          gsap.to (countContainer ,{
            y: targetY,
            duration: 0.3,
            ease: "power1.out",
            overwrite : true,
          });
        }
      });
   }, options);
  
   cards.forEach((card) => {
    observer.observe(card);
   });

   window.addEventListener('resize', () => positionCards(0));
});

  