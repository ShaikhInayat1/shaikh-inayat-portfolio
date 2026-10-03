// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Highlight active nav link while scrolling
const sections = document.querySelectorAll("main section[id]");
const links = navLinks.querySelectorAll("a");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => observer.observe(s));

// Contact form: opens the visitor's email app with the message pre-filled
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("Portfolio enquiry from " + data.get("name"));
  const body = encodeURIComponent(
    data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")"
  );
  window.location.href = "mailto:shaikhinayat.cs@gmail.com?subject=" + subject + "&body=" + body;
  note.textContent = "Opening your email app…";
  form.reset();
});
