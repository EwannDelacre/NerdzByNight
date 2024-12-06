document.addEventListener("DOMContentLoaded", () => {
  const points = document.querySelectorAll(".point");

  points.forEach((point, index) => {
    point.addEventListener("click", (event) => {
      // Réinitialiser toutes les colonnes
      const centerColumn = document.getElementById("center-column");
      const leftColumn = document.getElementById("left-column");
      const rightColumn = document.getElementById("right-column");

      // Vérifier si un conteneur est déjà ouvert
      const existingContainer = document.querySelector(".text-container");
      if (existingContainer) {
        existingContainer.remove();
      }

      // Déplacer les colonnes
      const isLeftSide = event.clientX < centerColumn.offsetWidth / 2;
      const direction = isLeftSide ? "translateX(15em)" : "translateX(-15em)";

      centerColumn.style.transform = direction;
      leftColumn.style.transform = direction;
      rightColumn.style.transform = direction;

      // Choisir le conteneur
      const container = isLeftSide ? leftColumn : rightColumn;

      // Contenu dynamique basé sur l'index du point
      let content = "";
      switch (index) {
        case 0: // Premier point
          content = `
                         <div class='text-container active' style='position: relative;'>
 <h1>La Peau et l'Océan</h1>
 <p>La peau et l'océan partagent une organisation en couches :</p>
 <img id="coucheocean" src="img/coucheocean.png" alt="Illustration des couches de l'océan" />
 <p><strong>Peau :</strong> Épiderme en surface, derme au centre, hypoderme en profondeur.</p>
 <p><strong>Océan :</strong> Zone épipélagique éclairée, mésopélagique intermédiaire, et bathypélagique sombre.</p>
 <p>Ces structures protègent, soutiennent et régulent les échanges essentiels à la vie.</p>
 </div>

                    `;
          break;
        case 1: // Deuxième point
          content = `
                        <div class='text-container active' style='position: relative;'>
                    <h1>Récepteurs Nerveux et Océan : Une Connexion</h1>
                    <p>
                    Les <span class="highlight">récepteurs nerveux</span> et l'<span class="highlight">océan</span> partagent des principes essentiels dans leur fonctionnement.
                    </p>
                    <img id ="coucheocean"src="img/oceannerveux.jpg" alt="Schéma montrant les connexions entre le système nerveux et l'océan">
                    <h2>Détection des Stimuli</h2>
                    <p>
                    Les récepteurs nerveux captent des signaux comme la chaleur ou la pression, tandis que l'océan réagit aux changements de température et de composition chimique.
                    </p>
                    <h2>Transmission des Signaux</h2>
                    <p>
                    Les nerfs transmettent des impulsions électriques au cerveau, alors que les courants océaniques diffusent des informations sous forme de chaleur et de nutriments.
                    </p>
                </div>
                    `;
          break;
        default:
          content = `<div class='text-container'>Contenu par défaut</div>`;
      }

      // Ajouter le contenu
      container.innerHTML = content;
    });
  });

  // Fermeture avec la touche Échap
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const centerColumn = document.getElementById("center-column");
      const leftColumn = document.getElementById("left-column");
      const rightColumn = document.getElementById("right-column");

      // Réinitialiser les transformations
      centerColumn.style.transform = "";
      leftColumn.style.transform = "";
      rightColumn.style.transform = "";

      // Supprimer le conteneur
      const container = document.querySelector(".text-container");
      if (container) {
        container.remove();
      }
    }
  });
});
