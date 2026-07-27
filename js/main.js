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

/* ----------------------------------------------------------
   9. ONGLETS DU PROGRAMME
   
   ---------------------------------------------------------- */
var boutonsOnglets = document.querySelectorAll(".tab-btn");
var panneauxJours = document.querySelectorAll(".day-panel");

for (var i = 0; i < boutonsOnglets.length; i++) {

  boutonsOnglets[i].addEventListener("click", function () {

    // On enleve "active" de tous les boutons
    for (var j = 0; j < boutonsOnglets.length; j++) {
      boutonsOnglets[j].classList.remove("active");
    }
    // On ajoute "active" seulement au bouton clique
    this.classList.add("active");

    var jourChoisi = this.getAttribute("data-day");

    // On affiche seulement le panneau du jour choisi
    for (var k = 0; k < panneauxJours.length; k++) {
      if (panneauxJours[k].getAttribute("data-day") === jourChoisi) {
        panneauxJours[k].classList.add("active");
      } else {
        panneauxJours[k].classList.remove("active");
      }
    }
  });
}


/* ----------------------------------------------------------
   10. FILTRAGE DES INTERVENANTS
   
   ---------------------------------------------------------- */
var boutonsFiltre = document.querySelectorAll(".filter-btn");
var cartesIntervenants = document.querySelectorAll(".speaker-card");

for (var i = 0; i < boutonsFiltre.length; i++) {

  boutonsFiltre[i].addEventListener("click", function () {

    // On enleve "active" de tous les boutons de filtre
    for (var j = 0; j < boutonsFiltre.length; j++) {
      boutonsFiltre[j].classList.remove("active");
    }
    this.classList.add("active");

    var categorieChoisie = this.getAttribute("data-filter");

    // On montre ou on cache chaque carte selon la categorie
    for (var k = 0; k < cartesIntervenants.length; k++) {
      var carte = cartesIntervenants[k];
      var categorieCarte = carte.getAttribute("data-category");

      if (categorieChoisie === "tous" || categorieChoisie === categorieCarte) {
        carte.style.display = "block";
      } else {
        carte.style.display = "none";
      }
    }
  });
}


/* ----------------------------------------------------------
   11. VALIDATION DU FORMULAIRE DE CONTACT
   
   ---------------------------------------------------------- */
var formulaireContact = document.getElementById("contactForm");

if (formulaireContact) {

  formulaireContact.addEventListener("submit", function (evenement) {
    evenement.preventDefault(); // empeche la page de se recharger

    var nom = document.getElementById("name");
    var email = document.getElementById("email");
    var telephone = document.getElementById("phone");
    var participation = document.getElementById("participation");
    var pays = document.getElementById("country");
    var message = document.getElementById("message");

    var formulaireValide = true;

    // --- Verification du nom ---
    if (nom.value.trim().length === 0) {
      afficherErreur(nom, "Merci d'indiquer votre nom complet.");
      formulaireValide = false;
    } else {
      afficherSucces(nom);
    }

    // --- Verification de l'email (doit contenir @ et un point) ---
    var emailValide = email.value.includes("@") && email.value.includes(".");
    if (!emailValide) {
      afficherErreur(email, "Merci d'indiquer un email valide.");
      formulaireValide = false;
    } else {
      afficherSucces(email);
    }

    // --- Verification du telephone (au moins 8 chiffres) ---
    var chiffresTelephone = telephone.value.replace(/[^0-9]/g, "");
    if (chiffresTelephone.length < 8) {
      afficherErreur(telephone, "Le numero doit contenir au moins 8 chiffres.");
      formulaireValide = false;
    } else {
      afficherSucces(telephone);
    }

    // --- Verification du type de participation ---
    if (participation.value === "") {
      afficherErreur(participation, "Merci de choisir un type de participation.");
      formulaireValide = false;
    } else {
      afficherSucces(participation);
    }

    // --- Verification du pays ---
    if (pays.value === "") {
      afficherErreur(pays, "Merci de choisir votre pays.");
      formulaireValide = false;
    } else {
      afficherSucces(pays);
    }

    // --- Verification du message (au moins 20 caracteres) ---
    if (message.value.trim().length < 20) {
      afficherErreur(message, "Votre message doit contenir au moins 20 caracteres.");
      formulaireValide = false;
    } else {
      afficherSucces(message);
    }

    // --- Si tout est correct, on affiche le succes et on vide le formulaire ---
    var messageSucces = document.getElementById("successMessage");

    if (formulaireValide) {
      messageSucces.classList.add("show");
      formulaireContact.reset();
    } else {
      messageSucces.classList.remove("show");
    }
  });
}

// Affiche une bordure rouge et un message d'erreur sous le champ
function afficherErreur(champ, texteErreur) {
  var groupe = champ.parentElement; // le div.form-group qui contient le champ
  champ.classList.add("invalid");
  champ.classList.remove("valid");
  groupe.classList.add("has-error");

  var zoneErreur = groupe.querySelector(".error-message");
  zoneErreur.textContent = texteErreur;
}

// Affiche une bordure verte quand le champ est correct
function afficherSucces(champ) {
  var groupe = champ.parentElement;
  champ.classList.add("valid");
  champ.classList.remove("invalid");
  groupe.classList.remove("has-error");
}

