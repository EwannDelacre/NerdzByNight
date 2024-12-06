// Image source pour le puzzle
const imageUrl = "./pirate.jpg"; // Remplace par ton image

// Initialisation des pièces et du plateau
const puzzleBoard = document.getElementById("puzzle-board");
const piecesContainer = document.getElementById("pieces");

// Générer des coordonnées pour chaque pièce
const positions = [];
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    positions.push({ row, col, index: row * 3 + col });
  }
}

// Créer une copie des positions originales avant de mélanger
const originalPositions = [...positions];

// Mélanger les positions aléatoirement
const shuffledPositions = positions.sort(() => Math.random() - 0.5);

// Créer les pièces mélangées
shuffledPositions.forEach((pos) => {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.style.backgroundImage = `url(${imageUrl})`;
  piece.style.backgroundPosition = `-${pos.col * 100}px -${pos.row * 100}px`;
  piece.setAttribute("draggable", true);
  piece.setAttribute("data-index", pos.index);
  piecesContainer.appendChild(piece);

  // Permettre le déplacement des pièces depuis le bas vers le puzzle
  piece.addEventListener("dragstart", (e) => {
    draggedPiece = e.target;
  });
});

// Variable pour garder la référence de la pièce en train d'être déplacée
let draggedPiece = null;

// Créer le plateau avec des zones de dépôt
originalPositions.forEach((pos, index) => {
  const placeholder = document.createElement("div");
  placeholder.classList.add("placeholder");
  placeholder.setAttribute("data-index", index);

  // Permettre de déplacer les pièces depuis le puzzle vers le bas
  placeholder.addEventListener("dragover", (e) => e.preventDefault());

  placeholder.addEventListener("drop", (e) => {
    // Trouver le placeholder cible
    const targetPlaceholder = e.target.closest('.placeholder');
    
    if (draggedPiece && targetPlaceholder) {
      // Vérifier si le placeholder contient déjà une pièce
      const targetPiece = targetPlaceholder.firstChild;
      
      if (targetPiece) {
        // Si une pièce existe déjà, l'échanger avec la pièce glissée
        const sourcePlaceholder = draggedPiece.closest('.placeholder');
        
        // Échanger les pièces
        sourcePlaceholder.appendChild(targetPiece);
        targetPlaceholder.appendChild(draggedPiece);
      } else {
        // Si aucune pièce n'existe, simplement déplacer la pièce
        targetPlaceholder.appendChild(draggedPiece);
      }
      
      // Vérifier si le puzzle est résolu
      checkWin();
    }
  });

  puzzleBoard.appendChild(placeholder);
});

// Bouton de validation
const validateButton = document.getElementById("validate-button");

// Vérifier si le puzzle est résolu
function checkWin() {
  const placeholders = document.querySelectorAll(".placeholder");
  let isComplete = true;

  placeholders.forEach((placeholder, index) => {
    const piece = placeholder.firstChild;
    
    if (!piece) {
      // Si aucune pièce n'est présente, c'est incomplet
      isComplete = false;
    } else {
      // Si la pièce est présente, vérifier si son index correspond à l'index attendu
      const pieceIndex = parseInt(piece.getAttribute("data-index"));
      if (pieceIndex !== index) {
        isComplete = false;
      }
    }
  });

  return isComplete;
}

validateButton.addEventListener("click", () => {
  if (checkWin()) {
    // Rediriger vers index.html en cas de succès
    window.location.href = "organe.html";
  } else {
    // Si le puzzle est incorrect, bloquer l'accès au site
    document.body.innerHTML = "<h1>Accès refusé. Vous êtes un robot !</h1>";
    document.body.style.color = "red";
    document.body.style.textAlign = "center";
    document.body.style.marginTop = "20%";
    document.body.style.fontFamily = "Arial, sans-serif";
  }
});