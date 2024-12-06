const peau = document.getElementById("peau");
peau.addEventListener("mouseover", (e) => {
  peau.style.transform = "scale(1.1)"; // Agrandir de 10%
});

peau.addEventListener("mouseout", (e) => {
  peau.style.transform = "scale(1)"; // Retour à la taille initiale
});

const point = document.getElementById("point")

const nerveux = document.getElementById("nerveux");
nerveux.addEventListener("mouseover", (e) => {
    nerveux.style.transform = "scale(1.1)"; // Agrandir de 10%
});

nerveux.addEventListener("mouseout", (e) => {
    nerveux.style.transform = "scale(1)"; // Retour à la taille initiale
});