// Slide-in chữ khi load trang
document.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.querySelector(".hero-content h2");
    const heroText = document.querySelector(".hero-content p");
    const button = document.querySelector(".btn");
  
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = "translateY(-20px)";
    heroText.style.opacity = 0;
    heroText.style.transform = "translateY(20px)";
    button.style.opacity = 0;
  
    setTimeout(() => {
      heroTitle.style.transition = "all 1s ease";
      heroTitle.style.opacity = 1;
      heroTitle.style.transform = "translateY(0)";
    }, 300);
  
    setTimeout(() => {
      heroText.style.transition = "all 1s ease";
      heroText.style.opacity = 1;
      heroText.style.transform = "translateY(0)";
    }, 600);
  
    setTimeout(() => {
      button.style.transition = "all 0.8s ease";
      button.style.opacity = 1;
    }, 900);
  });
  
  // Hiện phần khi cuộn xuống
  const revealSections = document.querySelectorAll(".section");
  
  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
  
    revealSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
  
      if (sectionTop < triggerBottom) {
        section.classList.add("show");
      }
    });
  }
  
  window.addEventListener("scroll", revealOnScroll);
  