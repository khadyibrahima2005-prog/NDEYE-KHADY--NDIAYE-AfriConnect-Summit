/* ==========================================================
   AfriConnect Summit — script.js
   
   JavaScript vanilla 
   ========================================================== */


/* ----------------------------------------------------------
   1. ANNEE DYNAMIQUE DANS LE FOOTER
   ---------------------------------------------------------- */
var yearSpan = document.getElementById("year");
if (yearSpan) {
  var anneeActuelle = new Date().getFullYear();
  yearSpan.textContent = anneeActuelle;
}


/* ----------------------------------------------------------
   2. DARK MODE / LIGHT MODE (avec localStorage)
   ---------------------------------------------------------- */
var themeBtn = document.getElementById("themeBtn");

// Au chargement de la page, on regarde si un theme a deja ete choisi avant
var themeEnregistre = localStorage.getItem("theme");
if (themeEnregistre === "light") {
  document.body.classList.add("light");
}

// Quand on clique sur le bouton, on change de theme
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}


/* ----------------------------------------------------------
   3. NAVBAR : elle change de fond apres 80px de defilement
   ---------------------------------------------------------- */
var navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (navbar) {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});


/* ----------------------------------------------------------
   4. MENU HAMBURGER (mobile)
   ---------------------------------------------------------- */
var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}


