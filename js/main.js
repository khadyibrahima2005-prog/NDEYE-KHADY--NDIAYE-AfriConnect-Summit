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


/* --------------------------------------------------------------
4.MENEU HAMBURGER (mobile)
-----------------------------------------------------------------*/
var menuBtn=document.getElementById("menuBtn");
var navLinks=document.getElementById("navLinks");

if(menuBtn && navLinks){
    menuBtn.addEventListener("click",function(){
        navLinks.classList.toggle("open");

    });
}

/* ----------------------------------------------------------
   5. COMPTE A REBOURS
   (seulement present sur la page index.html)
   ---------------------------------------------------------- */
var joursEl = document.getElementById("days");

if (joursEl) {

  // Date fictive de la conference : 12 novembre 2026 a 9h
  var dateCible = new Date("2026-11-12T09:00:00").getTime();

  function afficherCompteARebours() {
    var maintenant = new Date().getTime();
    var tempsRestant = dateCible - maintenant;

    if (tempsRestant < 0) {
      tempsRestant = 0;
    }

    var jours = Math.floor(tempsRestant / (1000 * 60 * 60 * 24));
    var heures = Math.floor((tempsRestant / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((tempsRestant / (1000 * 60)) % 60);
    var secondes = Math.floor((tempsRestant / 1000) % 60);

    // On ajoute un zero devant si le nombre est inferieur a 10
    joursEl.textContent = ajouterZero(jours);
    document.getElementById("hours").textContent = ajouterZero(heures);
    document.getElementById("minutes").textContent = ajouterZero(minutes);
    document.getElementById("seconds").textContent = ajouterZero(secondes);
  }

  function ajouterZero(nombre) {
    if (nombre < 10) {
      return "0" + nombre;
    }
    return "" + nombre;
  }

  afficherCompteARebours();                     // on affiche tout de suite
  setInterval(afficherCompteARebours, 1000);     // puis toutes les secondes
}
/* ----------------------------------------------------------
   6. COMPTEURS ANIMES AU SCROLL (chiffres cles)
   ---------------------------------------------------------- */
var chiffresACompter = document.querySelectorAll(".stat-number");

function lancerAnimationChiffre(element) {
  var valeurFinale = parseInt(element.getAttribute("data-target"));
  var valeurActuelle = 0;
  var pas = Math.ceil(valeurFinale / 50); // le nombre augmente en 50 petites etapes

  var intervalle = setInterval(function () {
    valeurActuelle = valeurActuelle + pas;

    if (valeurActuelle >= valeurFinale) {
      valeurActuelle = valeurFinale;
      clearInterval(intervalle);
    }

    element.textContent = valeurActuelle;
  }, 30);
}

// IntersectionObserver permet de savoir quand un element devient visible a l'ecran
var observateurChiffres = new IntersectionObserver(function (elements) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].isIntersecting) {
      lancerAnimationChiffre(elements[i].target);
      observateurChiffres.unobserve(elements[i].target); // une seule fois suffit
    }
  }
});

for (var i = 0; i < chiffresACompter.length; i++) {
  observateurChiffres.observe(chiffresACompter[i]);
}


/* ----------------------------------------------------------
   7. ANIMATION D'APPARITION AU SCROLL
   (pour les elements avec la classe "reveal")
   ---------------------------------------------------------- */
var elementsAAnimer = document.querySelectorAll(".reveal");

var observateurReveal = new IntersectionObserver(function (elements) {
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].isIntersecting) {
      elements[i].target.classList.add("is-visible");
      observateurReveal.unobserve(elements[i].target);
    }
  }
});

for (var i = 0; i < elementsAAnimer.length; i++) {
  observateurReveal.observe(elementsAAnimer[i]);
}


/* ----------------------------------------------------------
   8. BOUTON RETOUR EN HAUT
   ---------------------------------------------------------- */
var backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

