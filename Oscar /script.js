function bubble(x, y) {
    // Récupère la largeur de la fenêtre
    const windowWidth = window.innerWidth;

    // Récupère la taille de police de base (taille 1em)
    const htmlElement = document.documentElement;
    const baseFontSize = parseFloat(getComputedStyle(htmlElement).fontSize); // En pixels

    let ismoved = false;
    let leftColumn = document.getElementById('left-column');
    let rightColumn = document.getElementById('right-column');
    let container;
    let centerColumn = document.getElementById('center-column');

    // Vérifie s'il y a déjà un conteneur ouvert
    const existingTextContainer = document.querySelector('.text-container.active');

    // Si un conteneur est déjà ouvert
    if (existingTextContainer) {
        // Si c'est le même point, on ferme tout
        if (existingTextContainer.closest('.column') === (x < centerColumn.offsetWidth/2 ? leftColumn : rightColumn)) {
            closeBubble();
            return;
        }
        
        // Sinon, on ferme d'abord l'existant
        closeBubble();
    }

    if(x < document.getElementById("center-column").offsetWidth/2){
        container = leftColumn;
        // Déplace la colonne centrale vers la droite
        centerColumn.style.transform = 'translateX(15em)';
        // Déplace la colonne de gauche vers la droite
        leftColumn.style.transform = 'translateX(15em)';
        // Déplace la colonne de droite vers la droite
        rightColumn.style.transform = 'translateX(15em)';
        ismoved = true;
    } else {
        container = rightColumn;
        // Déplace la colonne centrale vers la gauche
        centerColumn.style.transform = 'translateX(-15em)';
        // Déplace la colonne de gauche vers la gauche
        leftColumn.style.transform = 'translateX(-15em)';
        // Déplace la colonne de droite vers la gauche
        rightColumn.style.transform = 'translateX(-15em)';
        ismoved = true;
    }

    // Ajoute un conteneur avec une classe active
    container.innerHTML = "<div class='text-container active' style='position: relative;'><p>Ceci est un exemple de texte à l'intérieur d'une div. Tu peux y ajouter autant de contenu que tu veux, comme des paragraphes, des images, etc.</p></div>";
}
  
function closeBubble() {
    // Réinitialise les positions des colonnes
    document.getElementById('center-column').style.transform = '';
    document.getElementById('left-column').style.transform = '';
    document.getElementById('right-column').style.transform = '';

    // Supprime tous les conteneurs de texte
    const textContainers = document.querySelectorAll('.text-container');
    textContainers.forEach(container => {
        container.remove(); // Supprime complètement l'élément
    });
}



function etape(etape) {
    // Cacher tous les éléments
    let etapes = document.getElementsByClassName("etape1");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    etapes = document.getElementsByClassName("etape2");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    etapes = document.getElementsByClassName("etape3");
    for (let i = 0; i < etapes.length; i++) {
        etapes[i].style.display = "none";
    }

    // Afficher l'étape correspondante
    if (etape == 1) {
        etapes = document.getElementsByClassName("etape1");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    } else if (etape == 2) {
        etapes = document.getElementsByClassName("etape2");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    } else if (etape == 3) {
        etapes = document.getElementsByClassName("etape3");
        for (let i = 0; i < etapes.length; i++) {
            etapes[i].style.display = "inline-block";
        }
    }
}




// Reste du code identique
document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.point');
    points.forEach(point => {
        point.addEventListener('click', (event) => {
            // Récupère les dimensions de la colonne centrale

            // Calcule les coordonnées relatives à la colonne centrale
            let x = event.clientX 
        let y = event.clientY 

        bubble(x, y);

        });
    });
});