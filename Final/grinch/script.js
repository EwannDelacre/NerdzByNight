document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const currentDay = today.getDate(); // Récupère le jour actuel (1-31)
  const grinchCases = new Set(); // Cases volées par le Grinch
  const grinchAudio = document.getElementById("grinch-audio");
  let grinchCount = 0;

  const surprises = [
    "🎄 Une citation inspirante : 'La magie de Noël, c'est un sourire qui illumine tout.'",
    "🎅 Une blague : Pourquoi le Père Noël est-il si joyeux ? Parce qu'il sait où sont les cadeaux !",
    "🦌 Une animation cachée : Rudolf danse ! <img src='renne.gif'>",
    "🌟 Une étoile filante… Faites un vœu !",
    "❄️ Des flocons qui fondent doucement…",
    "⛄ Un bonhomme de neige apparaît avec un clin d'œil ! <img src='snowman.gif'>",
    "🔔 Le carillon magique sonne la joie !",
    "🎁 Une surprise mystérieuse… peut-être un petit jeu demain ?",
    "🍪 Une recette secrète de <a href='https://www.marmiton.org/recettes/recette_petits-biscuits-de-noel_19726.aspx'>biscuits de Noël</a>",
    "📜 Un poème : 'Sous la neige étincelante, la magie de Noël se répand.'",
    "🕯️ Une lumière douce pour réchauffer le cœur.",
    "🎵 Une mélodie de Noël douce et joyeuse.",
    "🔮 Une prédiction : 'Un jour magique vous attend.'",
    "🎭 Une énigme à résoudre… Cherchez dans les étoiles !",
    "🥂 Une invitation à lever votre verre à la joie.",
    "🎉 Une explosion de confettis !",
    "🌟 Une étoile filante… Faites un vœu !",
    "📸 Une photo souvenir de l'esprit festif.",
    "🍷 Une idée pour préparer du <a href='https://www.adeline-cuisine.fr/recettes/vin-chaud-recette-traditionnelle/'>vin chaud maison</a> !",
    "🎮 Une mini-quête amusante pour gagner plus de surprises !",
    "📖 Une <a href='./la-lettre-magique.pdf'>histoire courte de Noël</a> à savourer.",
    "🎤 Une chanson classique revisitée !",
    "🎨 Un coloriage numérique spécial fêtes. <img src='./coloriage.jpg'>",
    "🎆 Une fin spectaculaire avant Noël.",
  ];

  // Variables globales
  let snowflakesDisplayed = false; // Vérifie si les flocons ont déjà été affichés

  // Fonction pour générer le calendrier
  const createCalendar = () => {
    const grid = document.querySelector(".grid");

    for (let i = 1; i <= 24; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.id = `box-${i}`;
      box.dataset.day = i;

      if (i <= currentDay) {
        // Débloquer jusqu'au jour actuel
        if (Math.random() < 0.15) {
          // 15% de chances que le Grinch vole la case
          grinchCases.add(i);
          grinchCount++;
          box.classList.add("stolen");
          box.innerHTML = `<span>Mwahaha!</span>`;
          box.addEventListener("click", () => {
            playGrinchSound(); // Ajout du son du Grinch
            showModalOnce("Oh non !", "Le Grinch a volé cette surprise ! 🎁💨");
          });
        } else {
          // Case normale avec surprise
          box.classList.add("unlocked");
          box.innerHTML = `<span>${i}</span>`;
          box.addEventListener("click", () => {
            if (i === 4) {
              // Si la surprise 4, afficher l'étoile
              showStarAnimation();
            }
            if (i === 6 && !grinchCases.has(i)) {
              // Affiche la modale de surprise normale
              showModalOnce(`Surprise du jour ${i}`, surprises[i - 1]);
            }
            if (i === 5 && !grinchCases.has(i)) {
              // Empêche d'ajouter plusieurs fois les flocons ou la modale
              showSnowflakes(); // Affiche les flocons dès le premier clic
              showModalOnce(`Surprise du jour ${i}`, surprises[i - 1]);
            }
            if (i === 7 && !grinchCases.has(i)) {
              // Affiche le carillon
              playCarillonSound();
              showModalOnce(`Surprise du jour ${i}`, surprises[i - 1]);
            } 
            if (i === 24 && !grinchCases.has(i)) {
                // Affiche le carillon
                playCarillonSound();
                showSnowflakes(); 
                showSnowflakes();
                showSnowflakes();
                showStarAnimation();
                showStarAnimation();
                grinchAudio.play(); 
                playGrinchSound(); 
                showModalOnce(`Surprise du jour ${i}`, surprises[i - 1]);
              } 
            else {
              showModalOnce(`Surprise du jour ${i}`, surprises[i - 1]);
            }
          });
        }
      } else {
        // Verrouiller les jours futurs
        
        box.classList.add("locked");
        box.innerHTML = `<span>${i}</span>`;
      }

      grid.appendChild(box);
    }

    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const addGrinchButton = document.getElementById("add-grinch");
    const dancingGrinch = document.getElementById("dancing-grinch");
    

    const maxGrinch = 3;

    console.log(grinchCount);
    const progressPercentage = (grinchCount / maxGrinch) * 100;
    progressBar.style.width = progressPercentage + "%";
    progressText.textContent = `${grinchCount} / ${maxGrinch} Grinch`;

    if (grinchCount === maxGrinch) {
      addGrinchButton.disabled = true;
      dancingGrinch.style.display = "block"; // Montre le GIF du Grinch dansant
      grinchAudio.play(); // Joue le fichier MP3
    }

    // Mettre à jour le Grinch-o-mètre
    document.getElementById("grinch-count").textContent = grinchCount;
  };

  const showModalOnce = (title, content) => {
    console.log("Tentative d'affichage d'une modale"); // Debugging
    if (document.querySelector(".modal")) {
      console.log("Une modale est déjà ouverte."); // Debugging
      return; // Si une modale existe déjà, on n'en crée pas une nouvelle
    }

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
            <div class="modal-content">
                <h2>${title}</h2>
                <p>${content}</p>
                <button class="close-modal">Fermer</button>
            </div>
        `;
    document.body.appendChild(modal);

    const closeModalButton = modal.querySelector(".close-modal");
    closeModalButton.addEventListener("click", () => {
      modal.remove();
      console.log("Modale fermée"); // Debugging
    });
  };

  // Fonction pour afficher l'étoile animée
  const showStarAnimation = () => {
    const star = document.createElement("img");
    star.src = "etoile.png"; // Assurez-vous que l'étoile est dans le bon dossier
    star.classList.add("star-animation");
    document.body.appendChild(star);

    // Animation de l'étoile qui traverse l'écran
    setTimeout(() => {
      star.remove(); // Enlever l'étoile après l'animation
    }, 2000); // L'étoile disparaît après 2 secondes
  };

  // Fonction pour afficher les flocons
  const createSnowflakes = () => {
    if (snowflakesDisplayed) return; // Si les flocons ont déjà été affichés, on ne les recrée pas

    const numberOfSnowflakes = 20; // Nombre de flocons à créer
    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("img");
      snowflake.src = "flocon.png"; // Assure-toi que l'image "flocon.png" est dans le bon dossier
      snowflake.classList.add("snowflake");

      // Position aléatoire des flocons
      snowflake.style.left = `${Math.random() * 99}vw`; // Position horizontale aléatoire
      snowflake.style.animationDuration = `${Math.random() * 3 + 3}s`; // Durée de la chute aléatoire (3 à 6 secondes)
      snowflake.style.animationDelay = `${Math.random() * 3}s`; // Retard avant le début de la chute

      document.body.appendChild(snowflake);
    }

    snowflakesDisplayed = true; // Marque que les flocons ont été affichés
  };

  // Ajouter l'animation de flocons au jour 5
  const showSnowflakes = () => {
    createSnowflakes(); // Crée les flocons une seule fois
  };

  // Fonction pour jouer le son du Grinch
  const playGrinchSound = () => {
    const audio = new Audio("grinch.mp3"); // Chemin vers le fichier audio
    audio.play();
  };

  // Fonction pour jouer le son du Carillon
  const playCarillonSound = () => {
    const audio = new Audio("carillon.mp3"); // Chemin vers le fichier audio
    audio.play();
  };

  createCalendar();
});
