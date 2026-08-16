
      //cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;

  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";

  updateCursorColor(); //merge listeners
});

(function animateRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;

  ring.style.left = rx + "px";
  ring.style.top = ry + "px";

  requestAnimationFrame(animateRing);
})();

document.querySelectorAll("a, button, .work-item, .project-media").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover-state");
    ring.classList.add("hover-state");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover-state");
    ring.classList.remove("hover-state");
  });
});

const darkSections = document.querySelectorAll("#works, footer, nav");

function updateCursorColor() {
  let isDark = false;

  darkSections.forEach((sec) => {
    const r = sec.getBoundingClientRect();
    if (my > r.top && my < r.bottom) isDark = true;
  });

  cursor.classList.toggle("dark-bg", isDark);
  ring.classList.toggle("dark-bg", isDark);
}

      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
      });

      const hamburger = document.getElementById("hamburger");
      const mobileNav = document.getElementById("mobileNav");
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open");
      });

      document.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("open");
          mobileNav.classList.remove("open");
        });
      });


      const revealEls = document.querySelectorAll(
        ".work-item, .project-card, .social-eyebrow, .social-headline, .social-link-item",
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      revealEls.forEach((el) => observer.observe(el));

      const workItems = document.querySelectorAll(".work-item");
      workItems.forEach((item) => {
        const video = item.querySelector(".work-video");

        item.addEventListener("mouseenter", () => {
          if (video && video.src && video.src !== window.location.href) {
            video.play().catch(() => {});
          }
        });

        item.addEventListener("mouseleave", () => {
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        });
      });

      const modal = document.getElementById("modal");
      const modalIframe = document.getElementById("modalIframe");
      const modalTitle = document.getElementById("modalTitle");
      const modalClose = document.getElementById("modalClose");

      const videoMap = {
        "Work Sample 1": "https://www.youtube.com/embed/DoYc6q7CLHs?autoplay=1",
        "Work Sample 2": "",
        "Work Sample 3": "",
        "Brand Reel": "https://www.youtube.com/embed/DoYc6q7CLHs?autoplay=1",
        "Short Film": "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        "YouTube Series":
          "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        "Music Video": "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
        "Documentary Cut":
          "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
      };

      workItems.forEach((item) => {
        item.addEventListener("click", () => {
          const title = item.dataset.title;
          const videoSrc = item.dataset.video || videoMap[title] || "";
          modalTitle.textContent = title;
          modalIframe.src = videoSrc;
          modal.classList.add("open");
          document.body.style.overflow = "hidden";
        });

        item.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            item.click();
          }
        });
      });

      function closeModal() {
        modal.classList.remove("open");
        modalIframe.src = "";
        document.body.style.overflow = "";
      }

      modalClose.addEventListener("click", closeModal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
      });
